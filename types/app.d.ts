import { ReactNode } from "react"

export interface user{
    name: string 
    pin: string
    dateCreated: any
    avatar?: number
    title?: string
    reset?: resetProps
}

export interface resetProps{
    question: string
    answer: string
}

export interface transaction{
    name:string 
    amount:number 
    description?:string
    type:'Income'|'Expense'
    category:string 
    dateCreated:string
}

export interface category{
    name: string 
    color: string
    logo: (color?: string) => ReactNode
}