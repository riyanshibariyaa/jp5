import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function decodeJWT(token: string): any | null {
  try {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64').toString('utf8')
    return JSON.parse(payload)
  } catch (err) {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value
  const decodedToken = token && decodeJWT(token)

  const { pathname } = request.nextUrl

  const publicPaths = [
    "/",
    "/auth/login",
    "/auth/register/jobseeker",
    "/auth/register/company",
    "/jobs",
    "/candidates",
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/register/company",
    "/api/jobs",
  ]

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  if (isPublicPath) {
    return NextResponse.next()
  }

  if (decodedToken && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))) {
    if (decodedToken.userType === "jobseeker") {
      return NextResponse.redirect(new URL("/dashboard/jobseeker", request.url))
    } else if (decodedToken.userType === "company_owner" || decodedToken.userType === "hr") {
      return NextResponse.redirect(new URL("/dashboard/company", request.url))
    } else if (decodedToken.userType === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/post-job") || pathname.startsWith("/admin")) {
    if (!decodedToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (pathname.startsWith("/dashboard/jobseeker") && decodedToken.userType !== "jobseeker") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    if (
      (pathname.startsWith("/dashboard/company") || pathname.startsWith("/post-job")) &&
      !(decodedToken.userType === "company_owner" || decodedToken.userType === "hr")
    ) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    if (pathname.startsWith("/admin") && decodedToken.userType !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|terms|privacy|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}

// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { verifyToken } from "./lib/auth" // Assuming verifyAuth is a utility to verify JWT

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("accessToken")?.value
//   const verifiedToken = token && (await verifyToken(token))

//   const { pathname } = request.nextUrl

//   // Public paths that don't require authentication
//   const publicPaths = [
//     "/",
//     "/auth/login",
//     "/auth/register/jobseeker",
//     "/auth/register/company",
//     "/jobs",
//     "/candidates",
//     "/api/auth/login",
//     "/api/auth/register",
//     "/api/auth/register/company",
//     "/api/jobs",
//     // Add other public API routes or static assets
//   ]

//   const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

//   if (isPublicPath) {
//     return NextResponse.next()
//   }

//   // Redirect authenticated users from auth pages to their respective dashboards
//   if (verifiedToken && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))) {
//     if (verifiedToken.userType === "jobseeker") {
//       return NextResponse.redirect(new URL("/dashboard/jobseeker", request.url))
//     } else if (verifiedToken.userType === "company_owner" || verifiedToken.userType === "hr") {
//       return NextResponse.redirect(new URL("/dashboard/company", request.url))
//     } else if (verifiedToken.userType === "admin") {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url))
//     }
//   }

//   // Protect dashboard routes
//   if (pathname.startsWith("/dashboard") || pathname.startsWith("/post-job") || pathname.startsWith("/admin")) {
//     if (!verifiedToken) {
//       // If no token or invalid token, redirect to login
//       return NextResponse.redirect(new URL("/auth/login", request.url))
//     }

//     // Role-based access control for dashboards
//     if (pathname.startsWith("/dashboard/jobseeker") && verifiedToken.userType !== "jobseeker") {
//       return NextResponse.redirect(new URL("/auth/login", request.url))
//     }
//     if (
//       (pathname.startsWith("/dashboard/company") || pathname.startsWith("/post-job")) &&
//       !(verifiedToken.userType === "company_owner" || verifiedToken.userType === "hr")
//     ) {
//       return NextResponse.redirect(new URL("/auth/login", request.url))
//     }
//     if (pathname.startsWith("/admin") && verifiedToken.userType !== "admin") {
//       return NextResponse.redirect(new URL("/auth/login", request.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|terms|privacy|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
// }
