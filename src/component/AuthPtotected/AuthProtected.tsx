import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function AuthProtected({children}:{children:ReactNode}) {
    const {userToken} = useContext(AuthContext)
  if(!userToken){
    return children
  }
  else{
    return <Navigate to={'/Feed'}/>
  }
}
