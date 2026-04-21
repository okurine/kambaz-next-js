"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../../client";
import { Button, FormCheck, FormControl } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const q = await client.findQuizById(qid as string);
      const qs = await client.findQuestionsForQuiz(qid as string);
      setQuiz(q);
      setQuestions(qs);
    };
    fetch();
  }, [qid]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let total = 0;
    questions.forEach((q) => {
      const answer = answers[q._id];
      if (q.type === "MULTIPLE_CHOICE") {
        const correct = q.choices?.find((c: any) => c.isCorrect)?.text;
        if (answer === correct) total += q.points || 0;
      } else if (q.type === "TRUE_FALSE") {
        if (answer === q.correctAnswer) total += q.points || 0;
      } else if (q.type === "FILL_BLANK") {
        const correct = q.possibleAnswers?.some(
          (a: string) => a.toLowerCase() === answer?.toLowerCase(),
        );
        if (correct) total += q.points || 0;
      }
    });
    setScore(total);
    setSubmitted(true);
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

  if (!quiz) return <div>Loading...</div>;

  const q = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;

  return (
    <div id="wd-quiz-preview" className="p-4" style={{ maxWidth: "800px" }}>
      {/* the warning thing */}
      <div className="alert alert-warning mb-4 text-danger">
        This is a preview of the published version of the quiz.
      </div>

      <h2>{quiz.title}</h2>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}
      <hr />

      {/* question navigation buttons */}
      {questions.length > 0 && (
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`btn btn-sm ${i === currentIndex ? "btn-danger" : "btn-outline-secondary"}`}
              style={{ width: "36px", height: "36px" }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* current question */}
      {q && (
        <div className="border rounded p-4 mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-bold">Question {currentIndex + 1}</span>
            <span>{q.points} pts</span>
          </div>
          <p>{q.questionText}</p>

          {/* mcq */}
          {q.type === "MULTIPLE_CHOICE" && (
            <div>
              {q.choices?.map((choice: any, i: number) => (
                <FormCheck
                  key={i}
                  type="radio"
                  name={`q-${q._id}`}
                  label={choice.text}
                  value={choice.text}
                  checked={answers[q._id] === choice.text}
                  onChange={() =>
                    !submitted && handleAnswer(q._id, choice.text)
                  }
                  className="mb-1"
                />
              ))}
            </div>
          )}

          {/* t/f questions */}
          {q.type === "TRUE_FALSE" && (
            <div>
              <FormCheck
                type="radio"
                name={`q-${q._id}`}
                label="True"
                checked={answers[q._id] === true}
                onChange={() => !submitted && handleAnswer(q._id, true)}
                className="mb-1"
              />
              <FormCheck
                type="radio"
                name={`q-${q._id}`}
                label="False"
                checked={answers[q._id] === false}
                onChange={() => !submitted && handleAnswer(q._id, false)}
              />
            </div>
          )}

          {/* fill in blank questions */}
          {q.type === "FILL_BLANK" && (
            <FormControl
              value={answers[q._id] || ""}
              onChange={(e) =>
                !submitted && handleAnswer(q._id, e.target.value)
              }
              placeholder="Your answer"
              style={{ maxWidth: "300px" }}
            />
          )}

          {/* show correct answers after submit */}
          {submitted && (
            <div
              className={`mt-2 small ${isCorrect(q) ? "text-success" : "text-danger"}`}
            >
              {isCorrect(q) ? (
                "✓ Correct"
              ) : (
                <span>
                  ✗ Incorrect.{" "}
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
      )}

      {/* prev/next buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          variant="outline-secondary"
          disabled={isFirst}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          Previous
        </Button>
        {isLast ? (
          !submitted ? (
            <Button variant="danger" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                setScore(0);
                setCurrentIndex(0);
              }}
            >
              Retake Preview
            </Button>
          )
        ) : (
          <Button
            variant="outline-secondary"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next
          </Button>
        )}
      </div>

      {/* score */}
      {submitted && (
        <div className="mb-4">
          Your score: {score} / {quiz.points} points
        </div>
      )}

    </div>
  );
}
