import styles from "./faq.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function Faq() {


  return (
    <div className={styles.faq}>
      <div className={styles.faqHead}>
        <a href="/" className={styles.icon}><FontAwesomeIcon icon={faHome} /></a>
        <h1>Často kladené otázky (FAQ)</h1>
        <a href="/about" className={styles.icon}><FontAwesomeIcon icon={faInfoCircle} /></a>
      </div>
      <div className={styles.faqDiv}>
        <h2 id="co-je-anonymni-poradna">1. Co je to anonymní poradna?</h2>
        <p>Naše anonymní poradna je online platforma, kde můžete pokládat 
          své dotazy zcela anonymně. Ať už máte otázky týkající se osobního 
          života, vztahů, práce, nebo jakékoli jiné oblasti, můžete se na 
          nás obrátit. Vaše dotazy budou zodpovězeny bez jakéhokoli hodnocení 
          nebo předsudků, a to vše zcela zdarma.</p>
      </div>
      <div className={styles.faqDiv}>
        <h2 id="jak-mohu-polozit-anonymni-dotaz">2. Jak mohu položit anonymní dotaz?</h2>
        <p>Chcete-li položit anonymní dotaz, jednoduše vyplňte formulář na 
          hlavní stránce. Není potřeba se registrovat ani zadávat žádné osobní 
          údaje. Pokud nechcete aby se Váš dotaz zobrazil na veřejné stránce,
          můžete zadat svou e-mailovou adresu a odpověď Vám příjde tam.</p>
      </div>
      <div className={styles.faqDiv}>
        <h2 id="jsou-moje-udaje-v-bezpeci">3. Jsou moje údaje v bezpečí?</h2>
        <p>Ano, naprosto. Naše platforma je navržena tak, aby chránila vaše 
          soukromí. Žádné osobní údaje nejsou ukládány ani sdíleny s třetími 
          stranami. Všechny dotazy jsou anonymní a e-mailové adresy, pokud 
          jsou uvedeny, jsou používány pouze pro zasílání odpovědí.</p>
      </div>
      <div className={styles.faqDiv}>
        <h2 id="jak-dlouho-trva-nez-dostanu-odpoved">4. Jak dlouho trvá, než dostanu odpověď?</h2>
        <p>Odpovědi jsou poskytovány co nejdříve, obvykle do 24 hodin. Pokud 
          je dotaz složitější, může trvat o něco déle, než na něj odpovíme. 
          Snažíme se však zajistit, aby všechny otázky byly zodpovězeny co 
          nejrychleji.</p>
      </div>
      <div className={styles.faqDiv}>
        <h2 id="mohu-oznacit-odpoved-jako-uzitecnou">5. Mohu označit odpověď jako užitečnou?</h2>
        <p>Ano, pod každou odpovědí najdete možnost označit ji jako užitečnou. 
          Tento systém nám pomáhá lépe pochopit, jaké odpovědi jsou pro 
          uživatele nejvíce přínosné a zlepšit tak kvalitu našich služeb.</p>
      </div>
      <div className={styles.faqDiv}>
        <h2 id="odpoved-neni-dostacujici">6. Co dělat, pokud má odpověď na můj dotaz není dostačující?</h2>
        <p>Pokud odpověď na váš dotaz není dostatečně podrobná nebo jasná, 
          můžete kdykoli položit doplňující otázku. Naším cílem je poskytnout 
          vám co nejpřesnější a nejpřínosnější odpovědi.</p>
      </div>
      <div className={styles.faqDiv}>
        <h2 id="vyhody-pouzivani-anonymni-poradny">7. Jaké jsou výhody používání anonymní poradny?</h2>
        <p>Používání naší anonymní poradny vám poskytuje bezpečné a diskrétní 
          prostředí pro získání odpovědí na vaše otázky. Můžete se zeptat na 
          cokoli bez obav z odhalení vaší identity.</p>
      </div>
      <div className={styles.faqDiv}>
        <h2 id="jak-zrusit-svuj-dotaz">8. Jak mohu zrušit svůj dotaz?</h2>
        <p>Pokud chcete svůj dotaz zrušit předtím, než na něj bude odpovězeno, 
          můžete nás kontaktovat prostřednictvím e-mailu (přes Anonymní dotaz). Uveďte prosím detaily 
          svého dotazu, abychom ho mohli identifikovat a odstranit.</p>
      </div>
    </div>
  );
}