"use client";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../client";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
    };
    fetchQuiz();
  }, [qid]);

    const handleTogglePublish = async () => {
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    setQuiz(updated);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div id="wd-quiz-details" className="p-4" style={{ maxWidth: "700px" }}>
      {isFaculty && (
        <div className="d-flex justify-content-end gap-2 mb-4">
            <Button
            variant={quiz.published ? "secondary" : "success"}
            onClick={handleTogglePublish}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/preview`)
            }
          >
            Preview
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            <FaPencilAlt className="me-1" /> Edit
          </Button>
        </div>
      )}

      <h2>{quiz.title}</h2>
      <hr />

      <table className="table">
        <tbody>
          <tr>
            <td className="text-end" style={{ width: "250px" }}>
              Quiz Type
            </td>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <td className="text-end">Points</td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td className="text-end">Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td className="text-end">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">Time Limit</td>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <td className="text-end">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <td className="text-end">Access Code</td>
            <td>{quiz.accessCode || "None"}</td>
          </tr>
          <tr>
            <td className="text-end">One Question at a Time</td>
            <td>{quiz.oneQuestionAtTime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end">Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available From</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : ""}
            </td>
            <td>
              {quiz.availableDate
                ? new Date(quiz.availableDate).toLocaleDateString()
                : ""}
            </td>
            <td>
              {quiz.untilDate
                ? new Date(quiz.untilDate).toLocaleDateString()
                : ""}
            </td>
          </tr>
        </tbody>
      </table>

      {!isFaculty && (
        <div className="mt-4">
          <Button
            variant="danger"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
          >
            Take Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
