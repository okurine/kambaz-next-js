"use client";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button
        variant="danger"
        onClick={handleShow}
        className="btn-tight float-end"
        id="wd-add-module-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />

      <Dropdown className="float-end me-1">
        <DropdownToggle variant="secondary" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <MdDoNotDisturbAlt size={21} /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <MdDoNotDisturbAlt size={21} /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button
        variant="secondary"
        className="btn-tight me-1 float-end"
        id="wd-view-progress"
      >
        View Progress
      </Button>
      <Button
        variant="secondary"
        className="btn-tight me-1 float-end"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>
    </div>
  );
}
