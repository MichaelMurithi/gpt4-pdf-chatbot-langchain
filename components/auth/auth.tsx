import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Auth({ children }: any) {
    const {data, status} = useSession()
    const isUser = !!data?.user

    useEffect(() => {
      if (status === 'loading') return;

      if (!isUser) signIn('google');

    }, [isUser, status])

    if (isUser) {
      return children
    }

    return <div>Signing you in...</div>
}