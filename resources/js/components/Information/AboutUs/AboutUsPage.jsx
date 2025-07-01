import React from "react";
import DataTable from "../../Template/DataTable";
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "@mui/material";

const AboutUsPage = () => {
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
            field: "content",
            headerName: "Content",
            align: "center",
            render: (row) => {
                // Parse the JSON content if it exists
                const contentArray = row.content ? JSON.parse(row.content) : [];
                const firstParagraph = contentArray[0] || "No content available";

                return (
                    <Tooltip title={firstParagraph}>
                        {firstParagraph.length > 30
                            ? `${firstParagraph.substring(0, 30)}...`
                            : firstParagraph}
                    </Tooltip>
                );
            },
        },
        {
            field: "image_path",
            headerName: "Image",
            align: "center",
            render: (row) => (
                <Tooltip title="About Us Image">
                    <Avatar
                        src={row.image_path}
                        alt="About Us"
                        sx={{ marginLeft: 4, width: 90, height: 50, borderRadius: 2 }}
                    />
                </Tooltip>
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
            fetchDataUrl="/admin/about_us/fetch_all_about_us"
            addButtonPath="/add-about-us"
            editButtonPath="/update-about-us"
            deleteUrl="/admin/about_us/delete_about_us"
            title="About Us Pages"
            enableChangePassword={false}
        />
    );
};

export default AboutUsPage;
