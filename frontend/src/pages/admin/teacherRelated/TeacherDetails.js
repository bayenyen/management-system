import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) console.log(error);

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Teacher Details
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Teacher Name: {teacherDetails?.name}
                    </Typography>

                    {/* ⭐ MULTIPLE CLASS DISPLAY */}
                    <Typography variant="h6" gutterBottom>
                        Classes:
                    </Typography>
                    {teacherDetails?.teachClasses?.length > 0 ? (
                        teacherDetails.teachClasses.map((cls, idx) => (
                            <Typography key={idx} sx={{ ml: 2 }}>
                                • {cls.sclassName}
                            </Typography>
                        ))
                    ) : (
                        <Typography>No classes assigned.</Typography>
                    )}

                    {/* ⭐ MULTIPLE SUBJECT DISPLAY */}
                    <Typography variant="h6" gutterBottom mt={2}>
                        Subjects:
                    </Typography>
                    {teacherDetails?.teachSubjects?.length > 0 ? (
                        teacherDetails.teachSubjects.map((subj, idx) => (
                            <Typography key={idx} sx={{ ml: 2 }}>
                                • {subj.subName} — {subj.sessions} sessions
                            </Typography>
                        ))
                    ) : (
                        <Button variant="contained" onClick={handleAddSubject}>
                            Add Subject
                        </Button>
                    )}

                    <Typography mt={3}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/Admin/teachers/chooseclass/${teacherDetails?._id}`)}
                        >
                            Assign Another Class
                        </Button>
                    </Typography>
                </Container>
            )}
        </>
    );
};

export default TeacherDetails;
