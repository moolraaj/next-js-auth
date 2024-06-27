import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    let token=request.cookies.get('token')?.value || ''

    let publicPath=pathname==='/login'||pathname==='/signup'||pathname==='/verifyemail'

    if(publicPath && token){
        return NextResponse.redirect(new URL('/products', request.url));
    }
    if(!publicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url));
    } 
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/verifyemail', 
        '/products',
        '/add-products',
        '/update-product/:id*'
       
           
    ]
};
