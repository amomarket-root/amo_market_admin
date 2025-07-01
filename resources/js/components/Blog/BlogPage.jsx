import React from "react";
import DataTable from "../Template/DataTable";
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import ExtensionOffTwoToneIcon from '@mui/icons-material/ExtensionOffTwoTone';
import { format } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Chip } from "@mui/material";

const BlogPage = () => {
    // Define category colors
    const getCategoryColor = (category) => {
        switch (category) {
            case 'shop':
                return 'primary';
            case 'delivery':
                return 'secondary';
            case 'customer':
                return 'success';
            case 'promotion':
                return 'warning';
            case 'reward':
                return 'info';
            case 'product':
                return 'error';
            case 'service':
                return 'default';
            default:
                return 'default';
        }
    };

    const columns = [
        {
            field: "main_title",
            headerName: "Main Title",
            align: "center",
            render: (row) => (
                <Tooltip title={row.main_title || "Not Assign"}>
                    {row.main_title
                        ? (row.main_title.length > 20 ? `${row.main_title.substring(0, 20)}...` : row.main_title)
                        : <ExtensionOffTwoToneIcon />}
                </Tooltip>
            ),
        },
        {
            field: "category",
            headerName: "Category",
            align: "center",
            render: (row) => (
                <Chip
                    label={row.category}
                    color={getCategoryColor(row.category)}
                    variant="filled"
                    size="medium"
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        minWidth: 80,
                        color: 'white',
                    }}
                />
            )
        },
        {
            field: "date",
            headerName: "Date",
            align: "center",
            render: (row) => (
                <>
                    {row.date ? format(new Date(row.date), "MMM-dd-yyyy") : ""}
                </>
            ),
        },
        {
            field: "multimedia",
            headerName: "Multimedia",
            align: "center",
            render: (row) => (
                <Tooltip title="Multimedia">
                    <Avatar src={row.multimedia} alt="Multimedia" sx={{ marginLeft: 11, width: 60, height: 35, borderRadius: 2 }} />
                </Tooltip>
            ),
        },
        {
            field: "updated_at",
            headerName: "Updated At",
            align: "center",
            render: (row) => (
                <>
                    {row.updated_at ? format(new Date(row.updated_at), "MMM-dd-yyyy hh:mm a") : ""}
                </>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            fetchDataUrl="/admin/blog/fetch_all_blog"
            addButtonPath="/add-blog"
            editButtonPath="/update-blog"
            deleteUrl="/admin/blog/delete_blog"
            title="Blog List"
            enableChangePassword={false}
        />
    );
};

export default BlogPage;
