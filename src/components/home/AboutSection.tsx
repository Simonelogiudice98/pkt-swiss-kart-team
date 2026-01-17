import styles from "@/styles/home.module.scss";

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Chi siamo</h2>

        <div className={styles.grid2}>
          <div className={styles.card}>
            <p className={styles.p}>
              Siamo un team racing nato con l’obiettivo di portare in pista competenza,
              passione e un supporto completo per chi vuole correre senza pensieri.
            </p>
            <p className={styles.p}>
              Seguiamo piloti e famiglie con un percorso di crescita, dalla scuola karting
              fino alle competizioni.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.founderImg} aria-label="Foto fondatore" />
            <div className={styles.caption}>Fondatore: Nome Cognome</div>
          </div>
        </div>
      </div>
    </section>
  );
}
