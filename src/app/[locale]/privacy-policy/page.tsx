"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPolicy");

  return (
    <main style={{ padding: "48px 0" }}>
      <div style={{ width: "min(900px, 92%)", margin: "0 auto" }}>
        <h1>{t("title")}</h1>
        <p>{t("lead")}</p>

        <section style={{ marginTop: 28 }}>
          <h2>{t("sections.controller.title")}</h2>
          <p>{t("sections.controller.body")}</p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>{t("sections.data.title")}</h2>
          <ul>
            <li>{t("sections.data.items.0")}</li>
            <li>{t("sections.data.items.1")}</li>
            <li>{t("sections.data.items.2")}</li>
          </ul>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>{t("sections.purposes.title")}</h2>
          <ul>
            <li>{t("sections.purposes.items.0")}</li>
            <li>{t("sections.purposes.items.1")}</li>
            <li>{t("sections.purposes.items.2")}</li>
          </ul>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>{t("sections.cookies.title")}</h2>
          <p>{t("sections.cookies.body")}</p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>{t("sections.thirdParties.title")}</h2>
          <p>{t("sections.thirdParties.body")}</p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>{t("sections.recipients.title")}</h2>
          <p>{t("sections.recipients.body")}</p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>{t("sections.transfers.title")}</h2>
          <p>{t("sections.transfers.body")}</p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>{t("sections.retention.title")}</h2>
          <p>{t("sections.retention.body")}</p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>{t("sections.rights.title")}</h2>
          <p>{t("sections.rights.body")}</p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>{t("sections.updates.title")}</h2>
          <p>{t("sections.updates.body")}</p>
        </section>
      </div>
    </main>
  );
}
