import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.page}>
            <h1>Home Page</h1>
            <p>
                <Link href="/login">Login</Link>
            </p>
            <p>
                <Link href="/signup">Signup</Link>
            </p>
        </div>
    );
}
