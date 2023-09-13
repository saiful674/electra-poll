import jsPDF from "jspdf";
import { formatDateToInputValue } from "./convertDate";

export const generatePDF = (electionData) => {
  const doc = new jsPDF();

  // Add election details to the PDF
  doc.setFontSize(16);
  // Calculate page width
  const pageWidth = doc.internal.pageSize.width;

  // Calculate the width of the text
  const textWidth =
    (doc.getStringUnitWidth("Election Result") * doc.internal.getFontSize()) /
    doc.internal.scaleFactor;

  // Calculate the X position to center-align the text
  const centerX = (pageWidth - textWidth) / 2;

  doc.text("Election Result", centerX, 20);
  doc.setFontSize(12);
  doc.text(`Election Title: ${electionData.title}`, 10, 30);
  doc.text(
    `Start Date: ${formatDateToInputValue(electionData.startDate)}`,
    10,
    40
  );
  doc.text(`End Date: ${formatDateToInputValue(electionData.endDate)}`, 10, 50);
  doc.text(`Status: ${electionData.status}`, 10, 60);

  // Add a table for displaying election questions, options, and votes
  const questions = electionData.questions;
  let yOffset = 80; // Y position for the table

  questions.forEach((question, index) => {
    // Question title
    doc.setFontSize(14);
    doc.text(`Question ${index + 1}: ${question.questionTitle}`, 10, yOffset);
    yOffset += 5;

    // Table header
    doc.setFontSize(12);
    const tableHeaders = ["Option", "Votes"];
    const colWidth = pageWidth / tableHeaders.length - 10;
    const cellHeight = 10;
    const cellPadding = 7;
    let xOffset = 10;

    tableHeaders.forEach((header) => {
      doc.setFillColor(67, 218, 122); // Gray background for headers
      doc.rect(xOffset, yOffset, colWidth, cellHeight, "F");
      doc.setTextColor(0, 0, 0); // Black text color
      doc.text(header, xOffset + cellPadding, yOffset + cellPadding);
      xOffset += colWidth;
    });

    yOffset += cellHeight;

    // Table rows
    question.options.forEach((option) => {
      xOffset = 10;

      // Add a border to both "Option" and "Votes" column cells
      const cellWidth = pageWidth / tableHeaders.length - 10;
      doc.rect(xOffset, yOffset, cellWidth, cellHeight); // Option column
      doc.text(option.option, xOffset + cellPadding, yOffset + cellPadding);
      xOffset += cellWidth;

      doc.rect(xOffset, yOffset, cellWidth, cellHeight); // Votes column
      doc.text(
        option.votes.toString(),
        xOffset + cellPadding,
        yOffset + cellPadding
      );
      yOffset += cellHeight;
    });

    // Add some space between questions
    yOffset += 10;
  });

  // Save the PDF with a specific file name
  doc.save("election_data.pdf");
};
