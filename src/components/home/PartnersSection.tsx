import styles from "@/styles/home.module.scss";

type Partner = { name: string; href: string };

export default function PartnersSection({ items }: { items: Partner[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Partner</h2>
        <p className={styles.muted}>Sponsor e partner (loghi cliccabili).</p>

        <div className={styles.partnersGrid}>
          {items.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className={styles.partnerCard}
            >
              <div className={styles.partnerLogo} aria-hidden />
              <span>{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
