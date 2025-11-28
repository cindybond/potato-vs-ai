export type Board = (string | null)[]; // '🥔', '🤖', or null

// Check if a player has won
export function checkWin(board: Board, player: string): boolean {
    const n = Math.sqrt(board.length); // supports 3x3 or 4x4
    const size = n as number;

    const rows = Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => i * size + j)
    );

    const cols = Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => j * size + i)
    );

    const diag1 = Array.from({ length: size }, (_, i) => i * size + i);
    const diag2 = Array.from({ length: size }, (_, i) => i * size + (size - 1 - i));

    const winCombos = [...rows, ...cols, diag1, diag2];

    return winCombos.some(combo => combo.every(idx => board[idx] === player));
}

// Check if there are empty moves
function generateMoves(board: Board): number[] {
    return board
        .map((val, idx) => (val === null ? idx : null))
        .filter(idx => idx !== null) as number[];
}

// Evaluate the board
export function evaluate(board: Board): number | null {
    if (checkWin(board, '🥔')) return 1;
    if (checkWin(board, '🤖')) return -1;
    if (!board.includes(null)) return 0; // Draw
    return null; // Not terminal
}

// Max (AI 'X') player
function maxValue(board: Board, alpha: number, beta: number): [number, number | null] {
    const score = evaluate(board);
    if (score !== null) return [score, null];

    let value = -Infinity;
    let bestMove: number | null = null;

    for (let idx of generateMoves(board)) {
        const newBoard = [...board];
        newBoard[idx] = '🥔';
        const [moveVal] = minValue(newBoard, alpha, beta);
        if (moveVal > value) {
            value = moveVal;
            bestMove = idx;
        }
        alpha = Math.max(alpha, value);
        if (alpha >= beta) break; // Beta cut-off
    }

    return [value, bestMove];
}

// Min (AI 'O') player
function minValue(board: Board, alpha: number, beta: number): [number, number | null] {
    const score = evaluate(board);
    if (score !== null) return [score, null];

    let value = Infinity;
    let bestMove: number | null = null;

    for (let idx of generateMoves(board)) {
        const newBoard = [...board];
        newBoard[idx] = '🤖';
        const [moveVal] = maxValue(newBoard, alpha, beta);
        if (moveVal < value) {
            value = moveVal;
            bestMove = idx;
        }
        beta = Math.min(beta, value);
        if (alpha >= beta) break; // Alpha cut-off
    }

    return [value, bestMove];
}

// Get optimal move for a player
export function optimalMove(board: Board, player: '🥔' | '🤖'): number | null {
    if (evaluate(board) !== null) return null;

    if (player === '🥔') {
        const [, move] = maxValue(board, -Infinity, Infinity);
        return move;
    } else {
        const [, move] = minValue(board, -Infinity, Infinity);
        return move;
    }
}
