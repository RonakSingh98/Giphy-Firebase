'use client'
// import styles from './page.module.css'
import { useRouter } from "next/navigation"
import Link from "next/link"
import GiphySearch from "./giphy/page"
import FirebaseAuth from "../lib/firebase/FirebaseAuth"
import Registerlogin from "./register/page"
export default function Home() {
  return (
    <div>
        <Link href="/"><Registerlogin/></Link>
      </div>
  )
}
