import React, { useEffect, useState } from 'react';
import { Table, Pagination, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import httpClient from "../services/httpClient";
import { toast, ToastContainer } from "react-toastify";

interface Inventory {
    guid: string;
    name: string;
    location: string;
    price: number;
}

const InventoriesTable = () => {

    const [loading, setLoading] = useState<Boolean>(true);
    const [inventories, setInventories] = useState<Inventory[]>([]);

    async function fetchData() {
        const response = await httpClient.get("/inventories");
        setInventories(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const onDeleteClick = (guid: string) => {
        if (window.confirm("დარწმუნებული ხართ რომ გსურთ ამ მოქმედების შესრულება?")) {
            httpClient.delete(`/inventories/${guid}`)
                .then(async () => {
                    setLoading(true);
                    await fetchData();
                    toast.success('ჩანაწერი წარმატებით წაიშალა', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setLoading(false);
                });
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = inventories.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(inventories.length / itemsPerPage);

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex justify-content-between mb-3">
                <Link to="/new" className="btn btn-primary">
                    შექმნა
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ნივთის სახელი</th>
                    <th>ნივთის ადგილმდებარეობა</th>
                    <th>ფასი</th>
                    <th>ოპერაციები</th>
                </tr>
                </thead>
                {loading ? (
                    <tbody>
                    <tr>
                        <td align="center" colSpan={4}>იტვირთება...</td>
                    </tr>
                    </tbody>
                ) : inventories.length === 0 ? (
                    <tbody>
                    <tr>
                        <td align="center" colSpan={4}>ჩანაწერები ვერ მოიწებნა.</td>
                    </tr>
                    </tbody>
                ) : (
                    <tbody>
                    {currentItems.map((inventory) => (
                        <tr key={inventory.guid}>
                            <td>{inventory.name}</td>
                            <td>{inventory.location}</td>
                            <td>{inventory.price}</td>
                            <td>
                                <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => onDeleteClick(inventory.guid)} className="btn btn-danger">წაშლა</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                )}
            </Table>
            {inventories.length > 0 && (
                <Row>
                    <Col md={6}>
                        <div className="text-muted">{`ნაჩვენებია ${inventories.length}-დან ${indexOfFirstItem + 1}-${indexOfLastItem} ელემენტი`}</div>
                    </Col>
                    <Col md={6}>
                        <Pagination className="justify-content-end">
                            <Pagination.Prev
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            />
                            {totalPages > 1 && (
                                <>
                                    <Pagination.Item
                                        key={1}
                                        active={currentPage === 1}
                                        onClick={() => handlePageChange(1)}
                                    >
                                        1
                                    </Pagination.Item>
                                    {currentPage > 4 && totalPages > 7 && <Pagination.Ellipsis />}
                                    {[...Array(totalPages > 7 ? 5 : totalPages - 2)].map((_, index) => {
                                        const pageNumber = currentPage + (index - 2);
                                        if ([-1, 0, 1].includes(pageNumber) || pageNumber === totalPages) {
                                            return null;
                                        }
                                        return (
                                            <Pagination.Item
                                                key={pageNumber}
                                                active={currentPage === pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                            >
                                                {pageNumber}
                                            </Pagination.Item>
                                        );
                                    })}
                                    {currentPage < totalPages - 3 && totalPages > 7 && <Pagination.Ellipsis />}
                                    {totalPages > 1 && (
                                        <Pagination.Item
                                            key={totalPages}
                                            active={currentPage === totalPages}
                                            onClick={() => handlePageChange(totalPages)}
                                        >
                                            {totalPages}
                                        </Pagination.Item>
                                    )}
                                </>
                            )}
                            <Pagination.Next
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            />
                        </Pagination>
                    </Col>
                </Row>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default InventoriesTable;