import Image from "next/image";
import Link from "next/link";
import logo from './../assets/logo.png'

export default function Header() {
    return (
        <header>
            <Link href="/">
                <Image src="/logo.png" alt="Logo" width={100} height={50} />
            </Link>
            
            <nav>
                <ul>
                    <li>
                        <Link href="/feed">Feed</Link>
                    </li>
                    <li>
                        <Link className="cta-link" href="/new-post">New Post</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
