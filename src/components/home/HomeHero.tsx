import styles from "@/styles/home.module.scss";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} aria-hidden />
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>PKT SWISS KART TEAM</h1>
        <p className={styles.heroSubtitle}>
          Passione, crescita e competizione. Dalla scuola karting alla pista.
        </p>

        <div className={styles.heroActions}>
          <Link className={styles.primaryBtn} href="/servizi">
            Scopri i servizi
          </Link>
          <Link className={styles.secondaryBtn} href="/piloti-gare">
            Piloti & Gare
          </Link>
        </div>
      </div>
    </section>
  );
}
