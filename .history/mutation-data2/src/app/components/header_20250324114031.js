import Link from "next/link";


export default function Header(){
    return(
        <header>
            <Link href="/">

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