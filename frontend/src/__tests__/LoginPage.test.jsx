import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(() => ({})),
  signInWithPopup: jest.fn(),
  getAdditionalUserInfo: jest.fn(() => ({ isNewUser: false })),
}))

jest.mock("../firebase", () => ({
  auth: {},
}))

import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth"
import LoginPage from "../authentication/LoginPage"

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it("signs in with Google and sets onboarding flags for new users", async () => {
    getAdditionalUserInfo.mockReturnValue({ isNewUser: true })
    signInWithPopup.mockResolvedValue({
      user: { displayName: "Test User", email: "test@example.com" },
    })

    const user = userEvent.setup()
    render(<LoginPage />)

    await user.click(screen.getByRole("button", { name: /sign in with google/i }))

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalledTimes(1)
    })

    expect(localStorage.getItem("showRegisterSuccess")).toBe("true")
    expect(localStorage.getItem("needsSetup")).toBe("true")
  })

  it("shows an error when sign-in fails", async () => {
    signInWithPopup.mockRejectedValue(new Error("Popup blocked"))

    const user = userEvent.setup()
    render(<LoginPage />)

    await user.click(screen.getByRole("button", { name: /sign in with google/i }))

    expect(
      await screen.findByText(/sign-in failed\. please try again\./i)
    ).toBeInTheDocument()
  })
})
