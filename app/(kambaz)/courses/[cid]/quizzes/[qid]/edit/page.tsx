"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../../client";
import { FaCheckCircle } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import {
  Button,
  FormControl,
  FormSelect,
  FormCheck,
  Row,
  Col,
} from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa6";

function MultipleChoiceEditor({ question, onChange }: any) {
  const addChoice = () => {
    const choices = [
      ...(question.choices || []),
      { text: "", isCorrect: false },
    ];
    onChange({ ...question, choices });
  };
  const removeChoice = (i: number) => {
    const choices = question.choices.filter((_: any, idx: number) => idx !== i);
    onChange({ ...question, choices });
  };
  const updateChoice = (i: number, text: string) => {
    const choices = question.choices.map((c: any, idx: number) =>
      idx === i ? { ...c, text } : c,
    );
    onChange({ ...question, choices });
  };
  const setCorrect = (i: number) => {
    const choices = question.choices.map((c: any, idx: number) => ({
      ...c,
      isCorrect: idx === i,
    }));
    onChange({ ...question, choices });
  };

  return (
    <div>
      <label className="fw-bold mb-2">Answers</label>
      {(question.choices || []).map((choice: any, i: number) => (
        <div key={i} className="d-flex align-items-center gap-2 mb-2">
          <input
            type="radio"
            name={`correct-${question._id}`}
            checked={choice.isCorrect}
            onChange={() => setCorrect(i)}
          />
          <FormControl
            value={choice.text}
            onChange={(e) => updateChoice(i, e.target.value)}
            placeholder={
              choice.isCorrect ? "Correct Answer" : "Possible Answer"
            }
          />
          <FaTrash
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => removeChoice(i)}
          />
        </div>
      ))}
      <Button variant="link" onClick={addChoice} className="p-0 mt-1">
        <FaPlus className="me-1" /> Add Another Answer
      </Button>
    </div>
  );
}

function TrueFalseEditor({ question, onChange }: any) {
  return (
    <div>
      <label className="fw-bold mb-2">Correct Answer</label>
      <div>
        <FormCheck
          type="radio"
          label="True"
          name={`tf-${question._id}`}
          checked={question.correctAnswer === true}
          onChange={() => onChange({ ...question, correctAnswer: true })}
          className="mb-1"
        />
        <FormCheck
          type="radio"
          label="False"
          name={`tf-${question._id}`}
          checked={question.correctAnswer === false}
          onChange={() => onChange({ ...question, correctAnswer: false })}
        />
      </div>
    </div>
  );
}

function FillBlankEditor({ question, onChange }: any) {
  const addAnswer = () => {
    const possibleAnswers = [...(question.possibleAnswers || []), ""];
    onChange({ ...question, possibleAnswers });
  };
  const removeAnswer = (i: number) => {
    const possibleAnswers = question.possibleAnswers.filter(
      (_: any, idx: number) => idx !== i,
    );
    onChange({ ...question, possibleAnswers });
  };
  const updateAnswer = (i: number, value: string) => {
    const possibleAnswers = question.possibleAnswers.map(
      (a: any, idx: number) => (idx === i ? value : a),
    );
    onChange({ ...question, possibleAnswers });
  };

  return (
    <div>
      <label className="fw-bold mb-2">Possible Correct Answers</label>
      {(question.possibleAnswers || []).map((answer: string, i: number) => (
        <div key={i} className="d-flex align-items-center gap-2 mb-2">
          <FormControl
            value={answer}
            onChange={(e) => updateAnswer(i, e.target.value)}
            placeholder="Possible Answer"
          />
          <FaTrash
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => removeAnswer(i)}
          />
        </div>
      ))}
      <Button variant="link" onClick={addAnswer} className="p-0 mt-1">
        <FaPlus className="me-1" /> Add Another Answer
      </Button>
    </div>
  );
}

function QuestionEditor({ question, onChange, onSave, onCancel }: any) {
  return (
    <div className="border rounded p-3 mb-3">
      <div className="d-flex gap-2 mb-3">
        <FormControl
          value={question.title}
          onChange={(e) => onChange({ ...question, title: e.target.value })}
          placeholder="Question Title"
          style={{ maxWidth: "200px" }}
        />
        <FormSelect
          value={question.type}
          onChange={(e) => onChange({ ...question, type: e.target.value })}
          style={{ maxWidth: "200px" }}
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True/False</option>
          <option value="FILL_BLANK">Fill in the Blank</option>
        </FormSelect>
        <div className="d-flex align-items-center gap-1 ms-auto">
          <label>pts:</label>
          <FormControl
            type="number"
            value={question.points}
            onChange={(e) =>
              onChange({ ...question, points: Number(e.target.value) })
            }
            style={{ width: "70px" }}
          />
        </div>
      </div>

      <label className="fw-bold mb-1">Question</label>
      <FormControl
        as="textarea"
        rows={3}
        value={question.questionText}
        onChange={(e) =>
          onChange({ ...question, questionText: e.target.value })
        }
        className="mb-3"
      />

      {question.type === "MULTIPLE_CHOICE" && (
        <MultipleChoiceEditor question={question} onChange={onChange} />
      )}
      {question.type === "TRUE_FALSE" && (
        <TrueFalseEditor question={question} onChange={onChange} />
      )}
      {question.type === "FILL_BLANK" && (
        <FillBlankEditor question={question} onChange={onChange} />
      )}

      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          Update Question
        </Button>
      </div>
    </div>
  );
}

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details",
  );
  const [quiz, setQuiz] = useState<any>({
    title: "Unnamed Quiz",
    description: "",
    quizType: "Graded Quiz",
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
    dueDate: "",
    availableDate: "",
    untilDate: "",
    published: false,
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      if (data) setQuiz(data);
    };
    const fetchQuestions = async () => {
      const data = await client.findQuestionsForQuiz(qid as string);
      setQuestions(data);
    };
    fetchQuiz();
    fetchQuestions();
  }, [qid]);

  const totalPoints = questions.reduce(
    (sum: number, q: any) => sum + (q.points || 0),
    0,
  );

  const handleAddQuestion = async () => {
    const newQuestion = await client.createQuestion(qid as string, {
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 0,
      questionText: "",
      choices: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      correctAnswer: true,
      possibleAnswers: [],
    });
    setQuestions([...questions, newQuestion]);
    setEditingIds(new Set([...editingIds, newQuestion._id]));
  };

  const handleSaveQuestion = async (question: any) => {
    await client.updateQuestion(question);
    setQuestions(questions.map((q) => (q._id === question._id ? question : q)));
    const newEditing = new Set(editingIds);
    newEditing.delete(question._id);
    setEditingIds(newEditing);

    // update quiz points
    const updatedPoints = questions
      .map((q) => (q._id === question._id ? question : q))
      .reduce((sum, q) => sum + (q.points || 0), 0);
    await client.updateQuiz({ ...quiz, points: updatedPoints });
    setQuiz({ ...quiz, points: updatedPoints });
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await client.deleteQuestion(questionId);
    setQuestions(questions.filter((q) => q._id !== questionId));
  };

  const handleSave = async () => {
    await client.updateQuiz({ ...quiz, points: totalPoints });
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    await client.updateQuiz({ ...quiz, points: totalPoints, published: true });
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  return (
    <div id="wd-quiz-editor" className="p-4" style={{ maxWidth: "800px" }}>
        
      {/* points + published status */}
      <div className="d-flex justify-content-end align-items-center mb-3 gap-3">
        <span>Points {totalPoints}</span>
        <span className="d-flex align-items-center gap-1">
          {quiz.published ? (
            <>
              <FaCheckCircle className="text-success fs-5" />{" "}
              <span>Published</span>
            </>
          ) : (
            <>
              <MdDoNotDisturbAlt className="text-secondary fs-5" />{" "}
              <span className="text-secondary">Not Published</span>
            </>
          )}
        </span>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active text-black" : "text-danger"}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active text-black" : "text-danger"}`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {activeTab === "details" && (
        <div>
          <FormControl
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            className="mb-4 fs-5"
            placeholder="Quiz Title"
          />
          <label className="mb-1">Quiz Instructions</label>
          <FormControl
            as="textarea"
            rows={4}
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            className="mb-4"
          />
          <Row className="align-items-center mb-3">
            <Col sm={4} className="text-end">
              <label>Quiz Type</label>
            </Col>
            <Col sm={8}>
              <FormSelect
                value={quiz.quizType}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="align-items-center mb-3">
            <Col sm={4} className="text-end">
              <label>Assignment Group</label>
            </Col>
            <Col sm={8}>
              <FormSelect
                value={quiz.assignmentGroup}
                onChange={(e) =>
                  setQuiz({ ...quiz, assignmentGroup: e.target.value })
                }
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </FormSelect>
            </Col>
          </Row>
          <div className="border rounded p-3 mb-4">
            <label className="fw-bold mb-3">Options</label>
            <FormCheck
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) =>
                setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
              }
              className="mb-2"
            />
            <div className="d-flex align-items-center gap-2 mb-2">
              <FormCheck
                type="checkbox"
                label="Time Limit"
                checked={quiz.timeLimit > 0}
                onChange={(e) =>
                  setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })
                }
              />
              {quiz.timeLimit > 0 && (
                <>
                  <FormControl
                    type="number"
                    value={quiz.timeLimit}
                    onChange={(e) =>
                      setQuiz({ ...quiz, timeLimit: Number(e.target.value) })
                    }
                    style={{ width: "80px" }}
                  />
                  <span>Minutes</span>
                </>
              )}
            </div>
            <FormCheck
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) =>
                setQuiz({ ...quiz, multipleAttempts: e.target.checked })
              }
              className="mb-2"
            />
            {quiz.multipleAttempts && (
              <Row className="align-items-center mb-2 ms-3">
                <Col sm={4}>
                  <label>How Many Attempts</label>
                </Col>
                <Col sm={4}>
                  <FormControl
                    type="number"
                    value={quiz.howManyAttempts}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        howManyAttempts: Number(e.target.value),
                      })
                    }
                  />
                </Col>
              </Row>
            )}
            <Row className="align-items-center mb-2">
              <Col sm={4}>
                <label>Show Correct Answers</label>
              </Col>
              <Col sm={8}>
                <FormSelect
                  value={quiz.showCorrectAnswers}
                  onChange={(e) =>
                    setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                  }
                >
                  <option>Immediately</option>
                  <option>After Due Date</option>
                  <option>Never</option>
                </FormSelect>
              </Col>
            </Row>
            <Row className="align-items-center mb-2">
              <Col sm={4}>
                <label>Access Code</label>
              </Col>
              <Col sm={8}>
                <FormControl
                  value={quiz.accessCode}
                  onChange={(e) =>
                    setQuiz({ ...quiz, accessCode: e.target.value })
                  }
                  placeholder=""
                />
              </Col>
            </Row>
            <FormCheck
              type="checkbox"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtTime}
              onChange={(e) =>
                setQuiz({ ...quiz, oneQuestionAtTime: e.target.checked })
              }
              className="mb-2"
            />
            <FormCheck
              type="checkbox"
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={(e) =>
                setQuiz({ ...quiz, webcamRequired: e.target.checked })
              }
              className="mb-2"
            />
            <FormCheck
              type="checkbox"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  lockQuestionsAfterAnswering: e.target.checked,
                })
              }
            />
          </div>
          <div className="border rounded p-3 mb-4">
            <Row className="align-items-center mb-3">
              <Col sm={3}>
                <label className="fw-bold">Due</label>
              </Col>
              <Col sm={9}>
                <FormControl
                  type="date"
                  value={quiz.dueDate}
                  onChange={(e) =>
                    setQuiz({ ...quiz, dueDate: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="align-items-center mb-3">
              <Col sm={3}>
                <label className="fw-bold">Available From</label>
              </Col>
              <Col sm={9}>
                <FormControl
                  type="date"
                  value={quiz.availableDate}
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableDate: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col sm={3}>
                <label className="fw-bold">Until</label>
              </Col>
              <Col sm={9}>
                <FormControl
                  type="date"
                  value={quiz.untilDate}
                  onChange={(e) =>
                    setQuiz({ ...quiz, untilDate: e.target.value })
                  }
                />
              </Col>
            </Row>
          </div>
        </div>
      )}

      {activeTab === "questions" && (
        <div>
          {questions.map((question: any) => (
            <div key={question._id}>
              {editingIds.has(question._id) ? (
                <QuestionEditor
                  question={question}
                  onChange={(updated: any) =>
                    setQuestions(
                      questions.map((q) =>
                        q._id === updated._id ? updated : q,
                      ),
                    )
                  }
                  onSave={() =>
                    handleSaveQuestion(
                      question._id === question._id
                        ? questions.find((q) => q._id === question._id)
                        : question,
                    )
                  }
                  onCancel={() => {
                    const newEditing = new Set(editingIds);
                    newEditing.delete(question._id);
                    setEditingIds(newEditing);
                  }}
                />
              ) : (
                <div className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold">{question.title}</span>
                    <span className="text-muted ms-2">
                      ({question.type.replace("_", " ")})
                    </span>
                    <span className="ms-2">{question.points} pts</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setEditingIds(new Set([...editingIds, question._id]))
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="text-center mt-3">
            <Button variant="secondary" onClick={handleAddQuestion}>
              <FaPlus className="me-1" /> New Question
            </Button>
          </div>
        </div>
      )}

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={handleSaveAndPublish}>
          Save & Publish
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
