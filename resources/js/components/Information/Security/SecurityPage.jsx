import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "@mui/material";

const SecurityPage = () => {
    const columns = [
        {
            field: "title",
            headerName: "Title",
            align: "center",
            render: (row) => (
                <Tooltip title={row.title || "Not Available"}>
                    {row.title ? (row.title.length > 20 ? `${row.title.substring(0, 20)}...` : row.title) : "-"}
                </Tooltip>
            ),
        },
        {
            field: "introduction",
            headerName: "Introduction",
            align: "center",
            render: (row) => (
                <Tooltip title={row.introduction || "Not Available"}>
                    {row.introduction ? (row.introduction.length > 30 ? `${row.introduction.substring(0, 30)}...` : row.introduction) : "-"}
                </Tooltip>
            ),
        },
        {
            field: "content_sections",
            headerName: "Content",
            align: "center",
            render: (row) => {
                const contentArray = row.content_sections ? JSON.parse(row.content_sections) : [];
                const firstSection = contentArray[0]?.content || "No content available";
                return (
                    <Tooltip title={firstSection}>
                        {firstSection.length > 30 ? `${firstSection.substring(0, 30)}...` : firstSection}
                    </Tooltip>
                );
            },
        },
        {
            field: "image_path",
            headerName: "Image",
            align: "center",
            render: (row) => (
                <Tooltip title="Security Page Image">
                    <Avatar
                        src={row.image_path}
                        alt="Security"
                        sx={{ marginLeft: 4, width: 90, height: 50, borderRadius: 2 }}
                    />
                </Tooltip>
            ),
        },
        {
            field: "is_active",
            headerName: "Status",
            align: "center",
            render: (row) => (
                row.is_active ? (
                    <Tooltip title="Active">
                        <ToggleOnTwoToneIcon color="success" />
                    </Tooltip>
                ) : (
                    <Tooltip title="Inactive">
                        <ToggleOffTwoToneIcon color="error" />
                    </Tooltip>
                )
            ),
        },
        {
            field: "updated_at",
            headerName: "Last Updated",
            align: "center",
            render: (row) => (
                <>
                    {row.updated_at ? format(new Date(row.updated_at), "MMM-dd-yyyy hh:mm a") : "Not updated"}
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchDataUrl="/admin/security_pages/fetch_all_security_pages"
            addButtonPath="/add-security"
            editButtonPath="/update-security"
            deleteUrl="/admin/security_pages/delete_security_page"
            title="Security Pages"
            enableChangePassword={false}
        />
    );
};

export default SecurityPage;
