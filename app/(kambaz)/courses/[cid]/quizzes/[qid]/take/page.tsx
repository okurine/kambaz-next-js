"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../../client";
import { Button, FormCheck, FormControl } from "react-bootstrap";

export default function QuizTake() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const q = await client.findQuizById(qid as string);
      const qs = await client.findQuestionsForQuiz(qid as string);
      setQuiz(q);
      setQuestions(qs);

      try {
        const last = await client.getLastAttempt(qid as string);
        if (last) {
          setLastAttempt(last);
          setAnswers(last.answers || {});
          setScore(last.score || 0);
          setSubmitted(true);
        }
      } catch (e) {}

      try {
        const { count } = await client.getAttemptCount(qid as string);
        setAttemptCount(count);
      } catch (e) {}
    };
    fetch();
  }, [qid]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const isCorrect = (q: any) => {
    const answer = answers[q._id];
    if (q.type === "MULTIPLE_CHOICE") {
      const correct = q.choices?.find((c: any) => c.isCorrect)?.text;
      return answer === correct;
    } else if (q.type === "TRUE_FALSE") {
      return answer === q.correctAnswer;
    } else if (q.type === "FILL_BLANK") {
      return q.possibleAnswers?.some(
        (a: string) => a.toLowerCase() === answer?.toLowerCase(),
      );
    }
    return false;
  };

  const handleSubmit = async () => {
    let total = 0;
    questions.forEach((q) => {
      if (isCorrect(q)) total += q.points || 0;
    });
    setScore(total);
    await client.submitAttempt(qid as string, answers, total);
    const { count } = await client.getAttemptCount(qid as string);
    setAttemptCount(count);
    setSubmitted(true);
  };

  const canRetake = () => {
    if (!quiz) return false;
    if (!quiz.multipleAttempts) return false;
    if (attemptCount < quiz.howManyAttempts) return true;
    return false;
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  if (!quiz) return <div>Loading...</div>;

  // Block if no attempts left and already submitted
  if (submitted && !canRetake() && lastAttempt) {
    return (
      <div id="wd-quiz-results" className="p-4" style={{ maxWidth: "800px" }}>
        <h2>{quiz.title}</h2>
        <div className="mb-4">
          Your score: {score} / {quiz.points} points
        </div>
        <h5>Your answers:</h5>
        {questions.map((q, index) => (
          <div key={q._id} className="border rounded p-4 mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-bold">Question {index + 1}</span>
              <span>{q.points} pts</span>
            </div>
            <p>{q.questionText}</p>
            {q.type === "MULTIPLE_CHOICE" && (
              <div>
                {q.choices?.map((choice: any, i: number) => (
                  <FormCheck
                    key={i}
                    type="radio"
                    name={`q-${q._id}`}
                    label={choice.text}
                    checked={answers[q._id] === choice.text}
                    disabled
                    className="mb-1"
                  />
                ))}
              </div>
            )}
            {q.type === "TRUE_FALSE" && (
              <div>
                <FormCheck
                  type="radio"
                  label="True"
                  checked={answers[q._id] === true}
                  disabled
                  className="mb-1"
                />
                <FormCheck
                  type="radio"
                  label="False"
                  checked={answers[q._id] === false}
                  disabled
                />
              </div>
            )}
            {q.type === "FILL_BLANK" && (
              <FormControl
                value={answers[q._id] || ""}
                disabled
                style={{ maxWidth: "300px" }}
              />
            )}
            <div className="mt-2 small">
              {isCorrect(q) ? (
                "Correct"
              ) : (
                <span>
                  Incorrect.{" "}
                  {q.type === "MULTIPLE_CHOICE" && (
                    <>
                      Correct answer:{" "}
                      {q.choices?.find((c: any) => c.isCorrect)?.text}
                    </>
                  )}
                  {q.type === "TRUE_FALSE" && (
                    <>Correct answer: {q.correctAnswer ? "True" : "False"}</>
                  )}
                  {q.type === "FILL_BLANK" && (
                    <>Possible answers: {q.possibleAnswers?.join(", ")}</>
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Back to Quizzes
        </Button>
      </div>
    );
  }

  return (
    <div id="wd-quiz-take" className="p-4" style={{ maxWidth: "800px" }}>
      <h2>{quiz.title}</h2>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}
      <hr />

      {questions.map((q, index) => (
        <div key={q._id} className="border rounded p-4 mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-bold">Question {index + 1}</span>
            <span>{q.points} pts</span>
          </div>
          <p>{q.questionText}</p>

          {q.type === "MULTIPLE_CHOICE" && (
            <div>
              {q.choices?.map((choice: any, i: number) => (
                <FormCheck
                  key={i}
                  type="radio"
                  name={`q-${q._id}`}
                  label={choice.text}
                  checked={answers[q._id] === choice.text}
                  onChange={() =>
                    !submitted && handleAnswer(q._id, choice.text)
                  }
                  disabled={submitted}
                  className="mb-1"
                />
              ))}
            </div>
          )}

          {q.type === "TRUE_FALSE" && (
            <div>
              <FormCheck
                type="radio"
                name={`q-${q._id}`}
                label="True"
                checked={answers[q._id] === true}
                onChange={() => !submitted && handleAnswer(q._id, true)}
                disabled={submitted}
                className="mb-1"
              />
              <FormCheck
                type="radio"
                name={`q-${q._id}`}
                label="False"
                checked={answers[q._id] === false}
                onChange={() => !submitted && handleAnswer(q._id, false)}
                disabled={submitted}
              />
            </div>
          )}

          {q.type === "FILL_BLANK" && (
            <FormControl
              value={answers[q._id] || ""}
              onChange={(e) =>
                !submitted && handleAnswer(q._id, e.target.value)
              }
              disabled={submitted}
              placeholder="Your answer"
              style={{ maxWidth: "300px" }}
            />
          )}

          {submitted && (
            <div className="mt-2 small">
              {isCorrect(q) ? (
                "Correct"
              ) : (
                <span>
                  Incorrect.{" "}
                  {q.type === "MULTIPLE_CHOICE" && (
                    <>
                      Correct answer:{" "}
                      {q.choices?.find((c: any) => c.isCorrect)?.text}
                    </>
                  )}
                  {q.type === "TRUE_FALSE" && (
                    <>Correct answer: {q.correctAnswer ? "True" : "False"}</>
                  )}
                  {q.type === "FILL_BLANK" && (
                    <>Possible answers: {q.possibleAnswers?.join(", ")}</>
                  )}
                </span>
              )}
            </div>
          )}
        </div>
      ))}

      {submitted && (
        <div className="mb-4">
          Your score: {score} / {quiz.points} points
        </div>
      )}

      <div className="d-flex gap-2">
        {!submitted && (
          <Button variant="danger" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        )}
        {submitted && canRetake() && (
          <Button variant="secondary" onClick={handleRetake}>
            Retake Quiz
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Back to Quizzes
        </Button>
      </div>
    </div>
  );
}
