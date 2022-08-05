import React from 'react'
import {render, screen} from '@testing-library/react'
import Card from "./Card";


const card = {
    id: 1,
    title: "API Call",
    description: "Nice description",
    position: 1
}

describe("CardTests", () => {
    test("Card is well displayed", () => {
        render(<Card card={card}/>);
    
        expect(screen.getByRole("heading")).toHaveTextContent("API Call");
    })
})