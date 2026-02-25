/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import * as ExcelJS from 'exceljs'
import * as PDFDocument from 'pdfkit'
import { Response } from 'express'

@Injectable()
export class ExportService {
  async exportToExcel(data: any[], filename: string, res: Response) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Fees Report')

    worksheet.columns = [
      { header: 'Receipt No', key: 'receiptNumber', width: 20 },
      { header: 'Student Name', key: 'studentName', width: 25 },
      { header: 'Course', key: 'course', width: 25 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Payment Date', key: 'paymentDate', width: 15 },
      { header: 'Payment Method', key: 'paymentMethod', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Center', key: 'center', width: 20 },
    ]

    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    }

    data.forEach((item) => {
      worksheet.addRow(item)
    })

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.xlsx`)

    await workbook.xlsx.write(res)
    res.end()
  }

  async exportToPDF(data: any[], filename: string, res: Response, title: string) {
    const doc = new PDFDocument({ margin: 50 })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`)

    doc.pipe(res)

    doc.fontSize(20).text(title, { align: 'center' })
    doc.moveDown()
    doc.fontSize(10).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'right' })
    doc.moveDown()

    const tableTop = 150
    const itemHeight = 30
    let y = tableTop

    doc.fontSize(10).font('Helvetica-Bold')
    doc.text('Receipt No', 50, y)
    doc.text('Student', 130, y)
    doc.text('Amount', 250, y)
    doc.text('Date', 320, y)
    doc.text('Method', 400, y)
    doc.text('Status', 480, y)

    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke()

    y += itemHeight
    doc.font('Helvetica')

    data.forEach((item, index) => {
      if (y > 700) {
        doc.addPage()
        y = 50
      }

      doc.fontSize(9)
      doc.text(item.receiptNumber || '-', 50, y, { width: 70 })
      doc.text(item.studentName || '-', 130, y, { width: 110 })
      doc.text(`₹${item.amount || 0}`, 250, y, { width: 60 })
      doc.text(item.paymentDate || '-', 320, y, { width: 70 })
      doc.text(item.paymentMethod || '-', 400, y, { width: 70 })
      doc.text(item.status || '-', 480, y, { width: 70 })

      y += itemHeight
    })

    doc.moveDown()
    doc.fontSize(12).font('Helvetica-Bold')
    const total = data.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
    doc.text(`Total Amount: ₹${total.toFixed(2)}`, 50, y + 20)

    doc.end()
  }

  async exportPendingFeesToExcel(data: any[], res: Response) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Pending Fees')

    worksheet.columns = [
      { header: 'Student Name', key: 'studentName', width: 25 },
      { header: 'Course', key: 'course', width: 25 },
      { header: 'Total Amount', key: 'totalAmount', width: 15 },
      { header: 'Paid Amount', key: 'paidAmount', width: 15 },
      { header: 'Pending Amount', key: 'pendingAmount', width: 15 },
      { header: 'Due Date', key: 'dueDate', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
    ]

    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF6B6B' },
    }

    data.forEach((item) => {
      worksheet.addRow(item)
    })

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=pending-fees.xlsx')

    await workbook.xlsx.write(res)
    res.end()
  }

  async exportCenterCollectionToExcel(data: any[], centerName: string, res: Response) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Center Collection')

    worksheet.mergeCells('A1:D1')
    worksheet.getCell('A1').value = `${centerName} - Collection Report`
    worksheet.getCell('A1').font = { bold: true, size: 14 }
    worksheet.getCell('A1').alignment = { horizontal: 'center' }

    worksheet.addRow([])

    worksheet.columns = [
      { header: 'Payment Method', key: 'paymentMethod', width: 20 },
      { header: 'Total Payments', key: 'totalPayments', width: 20 },
      { header: 'Total Collection', key: 'totalCollection', width: 20 },
    ]

    worksheet.getRow(3).font = { bold: true }
    worksheet.getRow(3).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4ECDC4' },
    }

    data.forEach((item) => {
      worksheet.addRow(item)
    })

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=center-collection.xlsx')

    await workbook.xlsx.write(res)
    res.end()
  }
}
