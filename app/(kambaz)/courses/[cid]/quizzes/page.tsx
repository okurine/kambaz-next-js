"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import * as client from "../../client";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import {
  Button,
  ListGroupItem,
  InputGroup,
  FormControl,
  Dropdown,
  ListGroup,
} from "react-bootstrap";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

function getAvailability(quiz: any) {
  const now = new Date();
  const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

  if (until && now > until) return "Closed";
  if (available && now < available)
    return `Not available until ${available.toLocaleDateString()}`;
  return "Available";
}

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await client.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    }
  };

  const handleTogglePublish = async (quiz: any) => {
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
  };

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid as string, {
      title: "Unnamed Quiz",
      course: cid,
      quizType: "Graded Quiz",
      points: 0,
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: "Immediately",
      accessCode: "",
      oneQuestionAtTime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      published: false,
    });
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  const visibleQuizzes = (
    isFaculty ? quizzes : quizzes.filter((q: any) => q.published)
  )
    .slice()
    .sort((a: any, b: any) => {
      if (!a.availableDate) return 1;
      if (!b.availableDate) return -1;
      return (
        new Date(a.availableDate).getTime() -
        new Date(b.availableDate).getTime()
      );
    });

  return (
    <div id="wd-quizzes">
      <div className="d-flex align-items-center gap-2 mb-4 w-75">
        <InputGroup className="me-5" size="lg" style={{ maxWidth: "370px" }}>
          <InputGroup.Text>
            <HiMiniMagnifyingGlass />
          </InputGroup.Text>
          <FormControl />
        </InputGroup>

        {isFaculty && (
          <Button
            variant="danger"
            size="lg"
            id="wd-add-quiz-btn"
            className="ms-auto"
            onClick={handleAddQuiz}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Button>
        )}
      </div>

      {visibleQuizzes.length === 0 && (
        <p className="text-muted">
          {isFaculty
            ? 'No quizzes yet. Click "+ Quiz" to add one.'
            : "No quizzes available."}
        </p>
      )}

      {/* quiz list */}
      <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray w-75">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="fs-3" />
          <IoMdArrowDropdown className="fs-4 me-2" />
          <span className="fw-bold">Assignment Quizzes</span>
        </div>

        <ListGroup className="rounded-0">
          {visibleQuizzes.map((quiz: any) => (
            <ListGroupItem
              key={quiz._id}
              className="d-flex align-items-start justify-content-between p-3"
            >
              <div className="d-flex align-items-start gap-2">
                <BsGripVertical className="fs-3 mt-1" />
                <LuNotebookPen className="fs-4 mt-1 text-success" />
                <div>
                  <span
                    className="fw-bold text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/courses/${cid}/quizzes/${quiz._id}`)
                    }
                  >
                    {quiz.title}
                  </span>
                  <div className="text-muted small mt-1">
                    <span
                      className={
                        getAvailability(quiz) === "Closed"
                          ? "text-danger"
                          : getAvailability(quiz) === "Available"
                            ? "text-success"
                            : "text-dark"
                      }
                    >
                      {getAvailability(quiz)}
                    </span>
                    {quiz.dueDate && (
                      <>
                        {" "}
                        | <strong>Due</strong>{" "}
                        {new Date(quiz.dueDate).toLocaleDateString()}
                      </>
                    )}
                    {" | "}
                    {quiz.points} pts
                    {quiz.questions && (
                      <> | {quiz.questions.length} Questions</>
                    )}
                  </div>
                </div>
              </div>

              {isFaculty && (
                <div className="d-flex align-items-center gap-2">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTogglePublish(quiz)}
                    title={quiz.published ? "Unpublish" : "Publish"}
                  >
                    {quiz.published ? (
                      <FaCheckCircle className="text-success fs-5" />
                    ) : (
                      <MdDoNotDisturbAlt className="text-secondary fs-5" />
                    )}
                  </span>

                  <Dropdown align="end">
                    <Dropdown.Toggle
                      bsPrefix="btn"
                      className="text-dark p-0 border-0 bg-transparent"
                      id={`quiz-menu-${quiz._id}`}
                    >
                      <IoEllipsisVertical className="fs-4" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          router.push(
                            `/courses/${cid}/quizzes/${quiz._id}/edit`,
                          )
                        }
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                        {quiz.published ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </ListGroupItem>
    </div>
  );
}
