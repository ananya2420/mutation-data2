import Link from "next/link";
import logo from './../assets/logo.png'

export default function Header(){
    return(
        <header>
            <Link href="/">
            <img src={logo} alt="Mobile phone with posts feed on it" />
            </Link>

            <nav>
                <ul>
                    <li>
                        <Link href="/feed">Feed</Link>
                    </li>

                    <li>
            <Link className='cta-link' href="/new-post">New Post</Link>
          </li>
                </ul>

            </nav>
        </header>
    )
}