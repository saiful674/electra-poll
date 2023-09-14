import jsPDF from "jspdf";
import logo from '../assets/logo.png';
import { formatDateToInputValue } from "./convertDate";

export const generatePDF = (electionData) => {
  const doc = new jsPDF();

  // Add election details to the PDF
  doc.setFontSize(20);
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

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
    // Check if a new page is needed for the table
    if (yOffset + 50 >= pageHeight) { // Adjust the threshold (50) as needed
      doc.addPage(); // Add a new page
      yOffset = 20; // Reset the Y position for the new page
    }

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

  // Add your website logo only on the last page
  const logoWidth = 30; // Adjust the width of the logo
  const logoHeight = 15; // Adjust the height of the logo
  const logoX = (pageWidth - logoWidth) / 2;
  const logoY = pageHeight - 30; // Adjust the Y position for the logo
  doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);

  // Add your email address below the logo on the last page
  doc.setFontSize(10);
  const emailText = 'Email: codecrafters80@gmail.com'; 
  const emailWidth = doc.getStringUnitWidth(emailText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const emailX = (pageWidth - emailWidth) / 2;
  const emailY = logoY + logoHeight + 5; // Adjust the Y position for the email address
  doc.text(emailText, emailX, emailY);

  const websiteText = 'Visit our website: electrapoll-64bc7.web.app'; 
  const websiteWidth = doc.getStringUnitWidth(websiteText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const websiteX = (pageWidth - websiteWidth) / 2;
  const websiteY = logoY + logoHeight + 10; // Adjust the Y position for the website address
  doc.text(websiteText, websiteX, websiteY);

  doc.save("election_data.pdf");
};
