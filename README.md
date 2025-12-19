# Project Overview

- This project implements an Order Execution Engine capable of processing Market Orders with automatic DEX routing and real-time status updates via WebSockets. The system compares prices from multiple decentralized exchanges (DEXs) and routes the order to the venue offering the best execution price, while providing live visibility into the order lifecycle.

- The implementation focuses on clean architecture, concurrency handling, reliability, and transparency, using a mock DEX environment to simulate real-world trading conditions.

- Key Objectives
    - Execute market orders efficiently
    - Compare quotes from Raydium and Meteora
    - Route trades to the best-priced DEX
    - Stream order status updates in real time
    - Handle concurrent orders with retries and fault tolerance
    - Persist order history for auditing and analysis

