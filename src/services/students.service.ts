import { GetCommand, PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import dynamo from "../db/dynamo.config";
import { Student } from "../models/student.model";

const TABLE_NAME = process.env.STUDENTS_TABLE || "StudentsTable";

export const createStudentService = async (student: Student) => {
  await dynamo.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: student,
    })
  );

  return student;
};

export const getAllStudentsService = async () => {
  const result = await dynamo.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    })
  );

  return result.Items || [
    {
      id: "",
      name: "",
      email: "",
      age: 0,
      createdAt: "",
    },
  ];
};

export const getStudentByIdService = async (id: string) => {
  const result = await dynamo.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    })
  );

  return result.Item;
};

export const updateStudentService = async (id: string, data: Partial<Student>) => {
  const updateExp = [] as string[];
  const expAttrValues: Record<string, any> = {};

  Object.keys(data).forEach((key) => {
    updateExp.push(`${key} = :${key}`);
    expAttrValues[`:${key}`] = (data as any)[key];
  });

  await dynamo.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `SET ${updateExp.join(", ")}`,
      ExpressionAttributeValues: expAttrValues,
      ReturnValues: "ALL_NEW",
    })
  );

  return { id, ...data };
};

export const deleteStudentService = async (id: string) => {
  await dynamo.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id },
    })
  );

  return { message: "Student deleted", id };
};
