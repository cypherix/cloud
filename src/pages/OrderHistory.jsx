import { useState } from "react"
import { useSelector } from "react-redux"



export const OrderHistory = () => {
    
    const user = useSelector((state) => state.user);

    return (
        <div>OrderHistory</div>
    )
}