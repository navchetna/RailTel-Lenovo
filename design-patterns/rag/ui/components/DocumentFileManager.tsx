"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import DescriptionIcon from "@mui/icons-material/Description"
import DeleteIcon from "@mui/icons-material/Delete"

type Department = "HR" | "Finance" | "Operations"

interface FileItem {
  id: string
  name: string
  size: string
  uploadDate: string
  departments?: Department[]
  department?: Department // For backward compatibility
}

const demoFiles: FileItem[] = [
  { id: "1", name: "Employee_Handbook_2024.pdf", size: "2.3 MB", uploadDate: "2024-01-15", department: "HR" },
  { id: "2", name: "Performance_Review_Template.docx", size: "156 KB", uploadDate: "2024-01-10", department: "HR" },
  { id: "3", name: "Onboarding_Checklist.xlsx", size: "89 KB", uploadDate: "2024-01-08", department: "HR" },
  { id: "4", name: "Q4_Budget_Report.xlsx", size: "1.8 MB", uploadDate: "2024-01-12", department: "Finance" },
  { id: "5", name: "Expense_Policy.pdf", size: "445 KB", uploadDate: "2024-01-05", department: "Finance" },
  { id: "6", name: "Invoice_Template.docx", size: "234 KB", uploadDate: "2024-01-03", department: "Finance" },
  { id: "7", name: "SOP_Manual.pdf", size: "3.2 MB", uploadDate: "2024-01-14", department: "Operations" },
  { id: "8", name: "Quality_Checklist.xlsx", size: "167 KB", uploadDate: "2024-01-09", department: "Operations" },
  { id: "9", name: "Process_Flow_Diagram.png", size: "892 KB", uploadDate: "2024-01-07", department: "Operations" },
]

export default function FileManagerPage() {
  const [allFiles, setAllFiles] = useState<FileItem[]>(demoFiles)
  const [selectedDepartmentsForUpload, setSelectedDepartmentsForUpload] = useState<Department[]>(["HR"])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)

  const handleDepartmentFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (!uploadedFiles || uploadedFiles.length === 0) return

    const newFiles: FileItem[] = Array.from(uploadedFiles).map((file, index) => ({
      id: `uploaded-${Date.now()}-${index}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split("T")[0],
      departments: [...selectedDepartmentsForUpload],
    }))

    setAllFiles((prev) => [...prev, ...newFiles])

    setToastMessage(`${newFiles.length} file(s) added with tags: ${selectedDepartmentsForUpload.join(", ")}`)
    setTimeout(() => setToastMessage(null), 3000)

    // Reset file input
    event.target.value = ""
  }

  const handleDeleteClick = (fileId: string) => {
    setFileToDelete(fileId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (fileToDelete) {
      setAllFiles((prev) => prev.filter((file) => file.id !== fileToDelete))
      setToastMessage("File has been removed successfully")
      setTimeout(() => setToastMessage(null), 3000)
    }
    setDeleteDialogOpen(false)
    setFileToDelete(null)
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setFileToDelete(null)
  }

  const getDepartmentColor = (dept: Department) => {
    switch (dept) {
      case "HR":
        return "#dbeafe" // blue
      case "Finance":
        return "#d1fae5" // green
      case "Operations":
        return "#e9d5ff" // purple
      default:
        return "#f5f5f5" // gray
    }
  }

  const sortedFiles = [...allFiles].sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fef2f2",
        p: { xs: 2, md: 3 },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            mb: 0.5,
            background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "800",
            fontSize: { xs: "1.8rem", md: "2rem" },
            letterSpacing: "-0.02em",
          }}
        >
          RailTel Document Manager
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#7f1d1d",
            fontWeight: "400",
            fontSize: { xs: "1rem", md: "1rem" },
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.5,
          }}
        >
          Manage and organize your enterprise documents by department
        </Typography>
      </Box>

      {/* Toast Message */}
      {toastMessage && (
        <Box
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            backgroundColor: "#10b981",
            color: "white",
            px: 3,
            py: 2,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
          }}
        >
          <Typography variant="body2">{toastMessage}</Typography>
        </Box>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: "#dc2626", fontWeight: 600 }}>
          Confirm File Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this file? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            sx={{
              borderColor: "#6b7280",
              color: "#6b7280",
              "&:hover": { borderColor: "#374151", color: "#374151" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#dc2626",
              "&:hover": { backgroundColor: "#b91c1c" },
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Content */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(220, 38, 38, 0.12)",
          border: "1px solid rgba(220, 38, 38, 0.08)",
          overflow: "hidden",
          height: { xs: "calc(100vh - 180px)", md: "calc(100vh - 200px)" },
        }}
      >
        <Box sx={{ display: "flex", height: "100%" }}>
          {/* Left side */}
          <Box sx={{ flex: { xs: 1, lg: 2 }, display: "flex", flexDirection: "column", p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 600, color: "#374151", fontSize: { xs: "1.5rem", md: "2rem" } }}
              >
                All Files
              </Typography>
              <Chip
                label={`${allFiles.length} files total`}
                sx={{
                  backgroundColor: "#dc2626",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  height: "32px",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                flex: 1,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                borderRadius: 2,
                overflow: "auto",
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE and Edge
              }}
            >
              <Table stickyHeader size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "#f8fafc",
                        color: "#1e293b",
                        py: 2,
                        fontSize: "0.9rem",
                        borderRight: "1px solid #e2e8f0",
                        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                      }}
                    >
                      File Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "#f8fafc",
                        color: "#1e293b",
                        py: 2,
                        fontSize: "0.9rem",
                        borderRight: "1px solid #e2e8f0",
                        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                        width: "100px",
                      }}
                    >
                      Size
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "#f8fafc",
                        color: "#1e293b",
                        py: 2,
                        fontSize: "0.9rem",
                        borderRight: "1px solid #e2e8f0",
                        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                        width: "120px",
                      }}
                    >
                      Upload Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "#f8fafc",
                        color: "#1e293b",
                        py: 2,
                        fontSize: "0.9rem",
                        borderRight: "1px solid #e2e8f0",
                        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                        width: "130px",
                      }}
                    >
                      Department
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "#f8fafc",
                        color: "#1e293b",
                        textAlign: "center",
                        py: 2,
                        fontSize: "0.9rem",
                        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                        width: "80px",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedFiles.map((file, index) => (
                    <TableRow
                      key={file.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f8fafc",
                          transform: "translateX(2px)",
                          transition: "all 0.2s ease",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                        height: "60px",
                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#fefefe",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <TableCell sx={{ py: 2, px: 2.5, borderRight: "1px solid #f1f5f9" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <DescriptionIcon
                            sx={{
                              color: "#dc2626",
                              fontSize: 22,
                              transition: "transform 0.2s ease",
                              "&:hover": { transform: "scale(1.1)" },
                            }}
                          />
                          <Typography
                            variant="body1"
                            fontWeight={500}
                            sx={{
                              color: "#1e293b",
                              fontSize: "0.9rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "200px",
                            }}
                          >
                            {file.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2.5, borderRight: "1px solid #f1f5f9" }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.85rem", fontWeight: 500 }}
                        >
                          {file.size}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2.5, borderRight: "1px solid #f1f5f9" }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.85rem", fontWeight: 500 }}
                        >
                          {file.uploadDate}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2.5, borderRight: "1px solid #f1f5f9" }}>
                        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                          {(file.departments || [file.department]).filter(Boolean).map((dept) => (
                            <Chip
                              key={dept}
                              label={dept}
                              size="small"
                              sx={{
                                backgroundColor: getDepartmentColor(dept || "HR"),
                                fontSize: "0.7rem",
                                height: "24px",
                                fontWeight: 500,
                                px: 0.5,
                                transition: "transform 0.2s ease",
                                "&:hover": {
                                  transform: "scale(1.05)",
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, px: 2.5 }}>
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(file.id)}
                            sx={{
                              color: "#ef4444",
                              "&:hover": {
                                color: "#dc2626",
                                backgroundColor: "#fef2f2",
                                transform: "scale(1.15)",
                              },
                              width: 36,
                              height: 36,
                              transition: "all 0.2s ease",
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Right side */}
          <Box
            sx={{
              flex: { xs: 0, lg: 1 },
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              minWidth: "350px",
              maxWidth: "400px",
              p: 3,
              backgroundColor: "#fafafa",
              borderLeft: "1px solid #e5e7eb",
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: "#374151", fontSize: "1.5rem" }}>
              Upload New Files
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#374151", fontSize: "1.1rem" }}>
                Select Department Tags
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {(["HR", "Finance", "Operations"] as Department[]).map((dept) => (
                  <Chip
                    key={dept}
                    label={dept}
                    clickable
                    variant="outlined"
                    onClick={() => {
                      setSelectedDepartmentsForUpload((prev) =>
                        prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept],
                      )
                    }}
                    sx={{
                      height: "36px",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      borderWidth: "2px",
                      borderRadius: "18px",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      ...(selectedDepartmentsForUpload.includes(dept)
                        ? {
                            backgroundColor: getDepartmentColor(dept),
                            borderColor: getDepartmentColor(dept)
                              .replace("f2fd", "a5e9")
                              .replace("f5e8", "86d4")
                              .replace("e5f5", "c4b5"),
                            color: dept === "HR" ? "#1e40af" : dept === "Finance" ? "#059669" : "#7c3aed",
                            "&:hover": {
                              backgroundColor: getDepartmentColor(dept),
                              borderColor: getDepartmentColor(dept)
                                .replace("f2fd", "93c5")
                                .replace("f5e8", "65a3")
                                .replace("e5f5", "a78b"),
                              transform: "translateY(-2px)",
                              boxShadow: `0 6px 12px ${getDepartmentColor(dept)}60`,
                            },
                          }
                        : {
                            backgroundColor: "transparent",
                            borderColor: "#d1d5db",
                            color: "#6b7280",
                            "&:hover": {
                              backgroundColor: getDepartmentColor(dept) + "40",
                              borderColor: getDepartmentColor(dept)
                                .replace("f2fd", "bfdb")
                                .replace("f5e8", "bbf7")
                                .replace("e5f5", "d8b4"),
                              color: dept === "HR" ? "#2563eb" : dept === "Finance" ? "#047857" : "#8b5cf6",
                              transform: "translateY(-2px)",
                            },
                          }),
                    }}
                  />
                ))}
              </Box>
              {selectedDepartmentsForUpload.length === 0 && (
                <Typography variant="body2" sx={{ color: "#ef4444", fontWeight: 500, mt: 1.5 }}>
                  Please select at least one department
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                border: "3px dashed #d1d5db",
                borderRadius: 3,
                p: 4,
                textAlign: "center",
                backgroundColor: "#fff",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                  borderColor: "#9ca3af",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Typography variant="h5" sx={{ mb: 1.5, fontSize: "1.3rem", fontWeight: 600, color: "#374151" }}>
                Drop files here
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5, fontSize: "0.9rem" }}>
                Selected tags:{" "}
                {selectedDepartmentsForUpload.length > 0 ? selectedDepartmentsForUpload.join(", ") : "None"}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: "0.85rem" }}>
                or click to browse files
              </Typography>
              <input
                type="file"
                multiple
                onChange={handleDepartmentFileUpload}
                style={{ display: "none" }}
                id="department-file-upload"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                disabled={selectedDepartmentsForUpload.length === 0}
              />
              <label htmlFor="department-file-upload">
                <Button
                  variant="contained"
                  component="span"
                  disabled={selectedDepartmentsForUpload.length === 0}
                  size="large"
                  sx={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    fontWeight: 600,
                    px: 3,
                    py: 1.2,
                    fontSize: "0.95rem",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#b91c1c",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)",
                    },
                  }}
                >
                  Choose Files
                </Button>
              </label>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
