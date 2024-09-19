import styles from './Components.module.css';

export default function QuestionsList({ questions }) {
  return (
    <div className={styles.results}>
      {
        questions.map((q) => (
          <div key={q.id} className={styles.question}>
            <p className={styles.name}>
              <i className="fas fa-question-circle"></i> <strong>{q.name}</strong> se ptá:
            </p>
            <p className={styles.ask}>{q.question}</p>

            {q.answer && (
              <div className={styles.answerSection}>
                <p className={styles.answer}>
                  <i className="fas fa-reply"></i> <strong>Odpověď:</strong> {q.answer}
                </p>
              </div>
            )}
          </div>
        ))
      }
    </div>
  );
}
