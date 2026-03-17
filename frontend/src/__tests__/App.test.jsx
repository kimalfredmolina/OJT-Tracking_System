import { act, render, screen } from "@testing-library/react"
import App from "../App"
import { onAuthStateChanged } from "firebase/auth"

jest.mock("firebase/auth", () => {
  return {
    GoogleAuthProvider: jest.fn(() => ({})),
    signInWithPopup: jest.fn(),
    getAdditionalUserInfo: jest.fn(() => ({ isNewUser: false })),
    onAuthStateChanged: jest.fn(),
  }
})

jest.mock("../firebase", () => ({
  auth: {},
}))

describe("App", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null)
      return () => {}
    })
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it("shows the login page when no user is authenticated", async () => {
    render(<App />)

    await act(async () => {
      jest.advanceTimersByTime(150)
    })

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
  })
})
