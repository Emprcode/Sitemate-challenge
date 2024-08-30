//  CRUD

import IssueSchema from "./IssueSchema.js";

// create
export const createIssue = (issue) => {
  return IssueSchema(issue).save();
};

// read
export const getIssues = () => {
  return IssueSchema.find();
};

//update
export const updateIssue = ({ _id, ...updateObj }) => {
  return IssueSchema.findByIdAndUpdate(_id, updateObj, { new: true });
};

//delete
export const deleteIssue = (_id) => {
  return IssueSchema.findByIdAndDelete(_id);
};
