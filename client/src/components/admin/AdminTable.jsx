import React from "react"
import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';
import { Trash2 } from 'lucide-react';

const AdminTable = ({ admins, onEdit, onDelete, disableId, isDeletePending }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">F.I.SH</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Login</th>
                            {/* <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th> */}
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Amallar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, idx) => (
                            <tr
                                key={admin._id}
                                className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                                    idx === admins.length - 1 ? "border-0" : ""
                                }`}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold"> */}
                                        {/* {admin.fullName.charAt(0).toUpperCase()} */}
                                        {/* </div> */}
                                        <span className="font-medium text-slate-900">{admin.fullName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-slate-600">{admin.login}</span>
                                </td>
                                {/* <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                                                                admin.role === "Super Admin"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-green-100 text-green-700"
                                                            }`}
                                                        >
                                                            {admin.role}
                                                        </span>
                                                    </td> */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            onClick={()=> onEdit(admin)}
                                            size="default"
                                            variant="ghost"
                                            className=" cursor-pointer"
                                            title="Admin o'zgartirish"
                                            disabled={isDeletePending && disableId === admin._id}
                                        >
                                            <Edit2 className="h-6 w-6" />
                                        </Button>
                                        <Button
                                            size="default"
                                            variant="ghost"
                                            onClick={() => onDelete(admin._id)}
                                            className="text-destructive hover:text-destructive cursor-pointer"
                                            title="Admin o'chirish"
                                            disabled={isDeletePending && disableId === admin._id}
                                        >
                                            <Trash2 className="h-6 w-6" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminTable
