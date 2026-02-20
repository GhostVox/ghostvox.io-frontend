import React, {ReactElement} from "react";
import {render, RenderOptions} from "@testing-library/react";
import {authCtx} from "@/context/AuthContext";
import {User} from "@/types/user";

// Default mock user for testing
export const mockUser: User = {
    id: "test-id",
    username: "test",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    picture: "",
    role: "user",
};

// Auth context wrapper with customizable user state
interface AuthProviderProps {
    user: User | null;
    setUser?: (user: User | null) => void;
    loading?: boolean;
    children: React.ReactNode;
}

export const AuthProvider = ({user, setUser = jest.fn(), loading=false, children}: AuthProviderProps) => (
    <authCtx.Provider value={{user, setUser, loading}}>{children}</authCtx.Provider>
);

// Custom render method that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
    user?: User | null;
    setUser?: (user: User | null) => void;
    loading?: boolean;
}

export function renderWithAuth(
    ui: ReactElement,
    {user = null, setUser = jest.fn(), loading = false, ...renderOptions}: CustomRenderOptions = {},
) {
    const Wrapper = ({children}: { children: React.ReactNode }) => (
        <AuthProvider user={user} setUser={setUser} loading={loading}>
            {children}
        </AuthProvider>
    );

    return render(ui, {wrapper: Wrapper, ...renderOptions});
}

// Mock responses for API calls
export const mockApiResponse = (status: number, data: unknown) => {
    return Promise.resolve({
        ok: status >= 200 && status < 300,
        status,
        statusText: status >= 200 && status < 300 ? "OK" : "Error",
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data)),
        headers: new Headers({
            Authorization: "Bearer mock-token",
        }),
        get: (name: string) => (name === "Authorization" ? "Bearer mock-token" : null),
        redirected: false,
        type: "basic" as ResponseType,
        url: "",
        clone: () => mockApiResponse(status, data),
        body: null,
        bodyUsed: false,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
        blob: () => Promise.resolve(new Blob([])),
        formData: () => Promise.resolve(new FormData()),
    } as unknown as Response);
};

// Helper to silence React 18 act() warnings
export const suppressActWarnings = () => {
    const originalError = console.error;
    beforeAll(() => {
        console.error = jest.fn((...args) => {
            if (
                typeof args[0] === "string" &&
                args[0].includes(
                    "Warning: The current testing environment is not configured to support act",
                )
            ) {
                return;
            }
            originalError.call(console, ...args);
        });
    });

    afterAll(() => {
        console.error = originalError;
    });
};

// Helper to create a mock event object
export const createMockEvent = (overrides = {}) => ({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    target: {value: "", name: "", ...overrides},
    ...overrides,
});
