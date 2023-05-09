import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const userPaths = ["/user/carrinho", "/user/meus_pedidos", "/user/perfil"];
const adminPaths = ["/admin/pizzas", "/admin/usuarios"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (!userPaths.includes(url.pathname) && !adminPaths.includes(url.pathname)) {
    url.pathname = "/404";
    return NextResponse.redirect(url);
  }

  if (!req.cookies.get("pizzeria.token")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
