import React from 'react'

export const Logout = () => {
    if(request.getSession().getAttribute("auth")!=null) {
        request.getSession().removeAttribute("auth");
        response.sendRedirect("/login");
    }else {
        response.sendRedirect("/");
    }
  return (
    <div>Logout</div>
  )
}
