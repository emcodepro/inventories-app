import React, {ReactNode, useState} from 'react';
import { Table, Pagination, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const InventoriesTable = () => {

    const inventories = [
        {
            guid: 1111,
            name: 'Product 1',
            location: 'Warehouse A',
            price: 25.99
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = inventories.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(inventories.length / itemsPerPage);

    return (
        <div className="container-fluid mt-4">
            <div className="d-flex justify-content-between mb-3">
                <Link to="/new" className="btn btn-primary">შექმნა</Link>
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
                <tbody>
                {currentItems.map((inventory) => (
                    <tr key={inventory.guid}>
                        <td>{inventory.name}</td>
                        <td>{inventory.location}</td>
                        <td>{inventory.price}</td>
                        <td>
                            <button className="btn btn-danger">წაშლა</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
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
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </Pagination>
                </Col>
            </Row>
        </div>
    );
};

export default InventoriesTable;