import styles from "@/styles/home.module.scss";

type Item = {
  year: string;
  title: string;
  description: string;
};

export default function TimelineSection({ items }: { items: Item[] }) {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <h2 className={styles.h2}>La nostra storia</h2>
        <p className={styles.muted}>
          Nascita del team, successi passati e piani futuri.
        </p>

        <ol className={styles.timeline}>
          {items.map((it) => (
            <li key={`${it.year}-${it.title}`} className={styles.timelineItem}>
              <div className={styles.dot} />
              <div>
                <div className={styles.timelineYear}>{it.year}</div>
                <div className={styles.timelineTitle}>{it.title}</div>
                <div className={styles.muted}>{it.description}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
