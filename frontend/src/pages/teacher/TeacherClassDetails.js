import React, { useEffect, useState } from "react";
import * as ReactM from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { updateStudentFields } from "../../redux/studentRelated/studentHandle";

import { Paper, Box, Typography, TextField } from "@mui/material";
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import Popup from "../../components/Popup";

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassStudents, loading, error, getresponse } = useSelector(
        (state) => state.sclass
    );
    const { currentUser } = useSelector((state) => state.user);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    const [selectedDate, setSelectedDate] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) console.log(error);

    const studentColumns = [
        { id: "name", label: "Name", minWidth: 150 },
        { id: "rollNum", label: "Roll No.", minWidth: 80 },
        { id: "actions", label: "Actions", minWidth: 300 },
    ];

    const studentRows =
        Array.isArray(sclassStudents) &&
        sclassStudents.map((student) => ({
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        }));

    // ---------- BUTTON COMPONENT ----------
    const StudentsButtonHaver = ({ row }) => {
        const saveAttendance = async (status) => {
            if (!selectedDate) {
                setPopupMsg("Please select a date first.");
                setShowPopup(true);
                return;
            }

            const fields = {
                subName: subjectID,
                status: status,
                date: selectedDate,
            };

            setLoadingBtn(true);

            try {
                await dispatch(
                    updateStudentFields(row.id, fields, "StudentAttendance")
                );

                setPopupMsg(`Attendance (${status}) saved successfully.`);
                setShowPopup(true);
        
            } catch (err) {
                setPopupMsg("Failed to save attendance.");
                setShowPopup(true);
            }

            setLoadingBtn(false);
        };

        const handleRemarks = () => {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
        };

        return (
            <Box sx={{ display: "flex", gap: 1 }}>
                <BlueButton
                    variant="contained"
                    onClick={() => saveAttendance("Present")}
                    disabled={loadingBtn}
                >
                    Present
                </BlueButton>

                <BlackButton
                    variant="contained"
                    onClick={() => saveAttendance("Absent")}
                    disabled={loadingBtn}
                >
                    Absent
                </BlackButton>

                <BlackButton variant="contained" onClick={handleRemarks}>
                    Provide Remarks
                </BlackButton>
            </Box>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Typography variant="h4" align="center" gutterBottom>
                        Class Details
                    </Typography>

                    {/* ONE DATE FOR ALL STUDENTS */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6">Select Attendance Date:</Typography>
                        <TextField
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            sx={{ mt: 1 }}
                        />
                    </Box>

                    {getresponse ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 2,
                            }}
                        >
                            No Students Found
                        </Box>
                    ) : (
                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                            <Typography variant="h5" gutterBottom>
                                Students List
                            </Typography>

                            {Array.isArray(sclassStudents) &&
                                sclassStudents.length > 0 && (
                                    <TableTemplate
                                        buttonHaver={StudentsButtonHaver}
                                        columns={studentColumns}
                                        rows={studentRows}
                                    />
                                )}
                        </Paper>
                    )}

                    <Popup
                        message={popupMsg}
                        setShowPopup={setShowPopup}
                        showPopup={showPopup}
                        color="green"  
                    />
                </>
            )}
        </>
    );
};

export default TeacherClassDetails;
