import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        let brandsArr = ['Samsung', 'Xiaomi', 'Realme', 'Apple'];
        let RAMArr = ['3GB', '4GB', '6GB', '8GB'];
        let ROMArr = ['32GB', '64GB', '128GB', '256GB'];
        let OSArr = ['Android', 'iOS'];

        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-primary bg-primary text-dark fs-5 px-4">
                    <div class="container-fluid">
                        <a class="navbar-brand text-warning fw-bold fs-3" href="/">MobileArena</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link" to="/mobiles">Mobiles</Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Brands</a>
                                    <ul class="dropdown-menu bg-danger" aria-labelledby="navbarDropdown">
                                        {
                                            brandsArr.map(brand =>
                                                <li><Link class="dropdown-item fw-bold text-dark text-center" to={`/mobiles/Brand/${brand}`}>{brand}</Link></li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">RAM</a>
                                    <ul class="dropdown-menu bg-danger" aria-labelledby="navbarDropdown">
                                        {
                                            RAMArr.map(RAM =>
                                                <li><Link class="dropdown-item fw-bold text-dark text-center" to={`/mobiles/RAM/${RAM}`}>{RAM}</Link></li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">ROM</a>
                                    <ul class="dropdown-menu bg-danger" aria-labelledby="navbarDropdown">
                                        {
                                            ROMArr.map(ROM =>
                                                <li><Link class="dropdown-item fw-bold text-dark text-center" to={`/mobiles/ROM/${ROM}`}>{ROM}</Link></li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">OS</a>
                                    <ul class="dropdown-menu bg-danger" aria-labelledby="navbarDropdown">
                                        {
                                            OSArr.map(OS =>
                                                <li><Link class="dropdown-item fw-bold text-dark text-center" to={`/mobiles/OS/${OS}`}>{OS}</Link></li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/mobiles/add">New Mobiles</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}






