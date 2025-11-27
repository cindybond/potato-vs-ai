import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { evaluate, optimalMove, type Board } from "../logic";

function Home() {
    const [isPlayer, setIsPlayer] = useState(true);
    const [board, setBoard] = useState(Array(9).fill(null));
    const winner = evaluate(board);

    const handleClick = (i: number) => {
        console.log(isPlayer)
        if(isPlayer && !board[i]) {
            const newBoard = [...board];
            newBoard[i] = "X";
            setBoard(newBoard);
            setIsPlayer(false);

            setTimeout(() => handleAITurn(newBoard), 500)
        } else {
            console.log('Wait for your turn dingus!')
        }  
    }

    const handleButtonClick = () => {
        setBoard(Array(9).fill(null))
        setIsPlayer(true);
    }

    const handleAITurn = (currBoard : Board) => {
        const move = optimalMove(currBoard, 'O');
        if (move !== null) {
            const newBoard = [...currBoard];
            newBoard[move] = 'O';
            setBoard(newBoard);
            setIsPlayer(true);
        }
    }
    
    const showWinner = () => {
        if (winner === 0) {
            return 'DRAW'
        } else if (winner === 1) {
            return 'YOU WIN'
        } else if (winner === -1) {
            return 'AI WIN'
        }
    }

    const showStatus = () => {
        return(
            <Box>
                <Typography sx={{
                    color: 'white',
                    fontFamily: 'Quantico'
                }}>
                    {winner !== null ? showWinner() : isPlayer ? "YOUR TURN" : "AI THINKING..."}
                </Typography>
            </Box>
        )
    }

    function Square({i, value}:{i:number, value: string | null}) {
        return(
            <Box>
                <Button onClick={() => handleClick(i)} sx={{
                    backgroundColor: 'black', 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: 0,
                    border: '2px solid #00BFFF'
                }}>
                    <Typography sx={{
                        fontSize: '80px',
                        color: 'white',
                        fontFamilt: 'Quantico'
                    }}>
                        {value}
                    </Typography>
                </Button>
            </Box>
        )
    }

    return(
        <Box sx={{
            backgroundColor: '#8A2BE2',
            minHeight: '100vh',
            display: 'flex',
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            textAlign: 'center',
            gap: 5
        }}>
            <Typography variant="h5" sx={{
                fontFamily: 'Science Gothic',
                fontWeight: 600,
                fontSize: 50,
                textShadow: '2px 2px white, -2px -2px white'
            }}>
                TIC TAC TOE vs AI
            </Typography>
            <Button onClick={() => handleButtonClick()} sx={{
                backgroundColor: '#fbca1f',
                fontFamily: 'Quantico',
                padding: '0.6em 1.3em',
                fontWeight: 900,
                fontSize: '18px',
                border: '3px solid black',
                borderRadius: '0.4em',
                boxShadow: '0.1em 0.1em',
                color: 'black',
                '&:hover' : {
                    transform: 'translate(-0.05em, -0.05em)',
                    boxShadow: '0.15em 0.15em',
                    border: '3px solid black'
                },
                ':active' : {
                    transform: 'translate(0.05em, 0.05em)',
                    boxShadow: '0.05em 0.05em'
                },
                '&:focus' :{
                    outline: 'none'
                }
            }}>
                NEW GAME
            </Button>
            {showStatus()}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)'
            }}>
                {board.map((value, index) => (
                    <Square key={index} i={index} value={value} />
                ))}
            </Box>
            
        </Box>
    )
}

export default Home;