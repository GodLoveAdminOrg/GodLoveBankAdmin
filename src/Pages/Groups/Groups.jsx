import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveDialog from "../../components/common/ResponsiveDialog";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import usePagination from "../../components/common/usePagination";
import EmotionDropdown from "./EmotionDropdown";
import { getAdminUsersQuestions, updateAdminUserQuestion } from "../../Services/homeApi";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const { pageItems, Pager } = usePagination(groups, 4);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await getAdminUsersQuestions();
      const grouped = (res.data.data || []).map((g) => ({
        name: g.group,
        questions: g.questions.map((q) => ({
          id: q.id,
          q: q.question,
          category: q.category,
          isActive: q.isActive,
        })),
      }));
      setGroups(grouped);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (group) => {
    setErrors({});
    setSelectedGroup({ ...group, index: groups.indexOf(group) });
    setShowModal(true);
  };

  const validate = () => {
    const e = {};
    selectedGroup.questions.forEach((q, idx) => {
      if (!q.q || !q.q.trim()) e[idx] = "Question cannot be empty";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (qIndex, field, value) => {
    const updated = { ...selectedGroup };
    updated.questions = [...updated.questions];
    updated.questions[qIndex] = { ...updated.questions[qIndex], [field]: value };
    setSelectedGroup(updated);
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      for (const q of selectedGroup.questions) {
        await updateAdminUserQuestion(q.id, { question: q.q });
      }
      const updatedGroups = [...groups];
      updatedGroups[selectedGroup.index] = selectedGroup;
      setGroups(updatedGroups);
      setShowModal(false);
      toast.success("Questions updated successfully");
    } catch (err) {
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Groups"
        subtitle="Manage assessment questions by group"
        actions={<EmotionDropdown />}
      />

      {loading ? (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 4 }}>
            <Table sx={{ minWidth: 560 }}>
              <TableHead>
                <TableRow sx={{ "& th": { fontWeight: 700, bgcolor: "#fafbfc", color: "text.secondary" } }}>
                  <TableCell>Group</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageItems.map((group) =>
                  group.questions.map((item, qIndex) => (
                    <TableRow key={`${group.name}-${qIndex}`} hover>
                      {qIndex === 0 && (
                        <TableCell rowSpan={group.questions.length} sx={{ fontWeight: 700, verticalAlign: "top" }}>
                          {group.name}
                        </TableCell>
                      )}
                      <TableCell sx={{ fontSize: 14 }}>{item.q}</TableCell>
                      <TableCell>{item.category || "-"}</TableCell>
                      {qIndex === 0 && (
                        <TableCell rowSpan={group.questions.length} align="right" sx={{ verticalAlign: "top" }}>
                          <Button size="small" variant="outlined" onClick={() => handleEdit(group)}>
                            Edit
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Pager />
        </>
      )}

      {/* EDIT DIALOG */}
      <ResponsiveDialog open={showModal && Boolean(selectedGroup)} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
        {selectedGroup && (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>Edit {selectedGroup.name}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2.5} sx={{ pt: 1 }}>
                {selectedGroup.questions.map((q, idx) => (
                  <Box key={q.id}>
                    <Typography variant="caption" color="text.secondary">
                      Question {idx + 1}
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 0.5 }}>
                      <TextField
                        fullWidth
                        value={q.q}
                        onChange={(e) => handleInputChange(idx, "q", e.target.value)}
                        error={Boolean(errors[idx])}
                        helperText={errors[idx]}
                      />
                      <TextField
                        fullWidth
                        label="Category"
                        value={q.category || ""}
                        onChange={(e) => handleInputChange(idx, "category", e.target.value)}
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </Button>
            </DialogActions>
          </>
        )}
      </ResponsiveDialog>
    </Layout>
  );
}
