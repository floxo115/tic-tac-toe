import * as _ from 'lodash';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map} from 'rxjs/operators'

export enum CellStatus {
    STATUS_PLAYER,
    STATUS_ADVERSARY,
    STATUS_NONE
}

export class GameRepr {
    board: Array<Array<CellStatus>>;
    private n = 3;

    constructor(private player = true, state: Array<Array<CellStatus>> | null = null) {
        if (!state) {
            this.board = Array(this.n);
            for (let row = 0; row < this.n; row++) {
                this.board[row] = Array(this.n)
                for (let col = 0; col < this.n; col++) {
                    this.board[row][col] = CellStatus.STATUS_NONE;
                }
            }
        } else {
            this.board = state;
        }
    }

    public isPlayer(): boolean {
        return this.player;
    }

    public result(row: number, col: number): GameRepr {
        if (this.isTerminalState() || this.board[row][col] != CellStatus.STATUS_NONE)
            return this;

        const newCells = _.cloneDeep(this.board);
        newCells[row][col] = (this.isPlayer() ? CellStatus.STATUS_PLAYER : CellStatus.STATUS_ADVERSARY);

        return new GameRepr(!this.player, newCells)
    }

    public getTile(row: number, col: number): CellStatus {
        return this.board[row][col];
    }

    public actions(): Array<[number, number]> {
        const actions: Array<[number, number]> = [];

        for (const row in this.board) {
            for (const col in this.board[row]) {
                if (this.board[row][col] == CellStatus.STATUS_NONE) {
                    actions.push([parseInt(row), parseInt(col)]);
                }
            }
        }

        return actions;
    }

    public isTerminalState(): boolean {
        if (this.actions().length == 0)
            return true;

        return this.util(this.isPlayer()) != 0;
    }

    public util(player: boolean): number {
        // TODO BAD!
        const b = this.board;
        for (const i in this.board) {
            if (b[i][0] != CellStatus.STATUS_NONE && b[i][0] == b[i][1] && b[i][1] == b[i][2] ||
                b[0][i] != CellStatus.STATUS_NONE && b[0][i] == b[1][i] && b[1][i] == b[2][i]) {
                if (b[i][0] == CellStatus.STATUS_PLAYER)
                    return 1
                else
                    return -1;
            }
        }

        if (b[0][0] != CellStatus.STATUS_NONE && b[0][0] == b[1][1] && b[1][1] == b[2][2] ||
            b[0][2] != CellStatus.STATUS_NONE && b[0][2] == b[1][1] && b[1][1] == b[2][0])
            if (b[1][1] == CellStatus.STATUS_PLAYER)
                return 1
            else
                return -1;

        return 0;
    }

}

interface GameAdversary {
    next(gameRepr: GameRepr): [number, number];
}

class RandomGameAdversary implements GameAdversary {
    next(gameRepr: GameRepr): [number, number] {
        const actions = gameRepr.actions();
        const action = actions[_.random(0, actions.length - 1)];
        return action;
    }
}

// TODO
// class MiniMaxGameAdversary implements GameAdversary {
//     public next(game: GameRepr): [number, number] {
//         return this.minimax(game);
//     }
// }

export class GameService {
    private game: GameRepr;
    private subject: BehaviorSubject<GameRepr>;
    private observable: Observable<GameRepr>

    // TODO this should come into a new class!
    private adversary: GameAdversary = new RandomGameAdversary()

    constructor() {
        this.game = new GameRepr();
        this.subject = new BehaviorSubject(this.game);
        this.observable = this.subject.asObservable();
    }


    public getGame(): Observable<GameRepr> {
        return this.subject.asObservable();
    }

    public getBoard(): Observable<Array<Array<CellStatus>>> {
        return this.observable.pipe(map((game) => game.board))
    }

    public getTile(row: number, col: number): Observable<CellStatus> {
        return this.observable.pipe(map((game) => game.getTile(row, col)))
    }

    public getTerminalState(): Observable<boolean> {
        return this.observable.pipe(map((game) => game.isTerminalState()))
    }

    public getWinner(): Observable<number> {
        return this.observable.pipe(map((game) => game.util(game.isPlayer())));
    }

    public next(row: number, col: number) {
        this.game = this.game.result(row, col);
        this.subject.next(this.game);

        if (!this.game.isTerminalState() && !this.game.isPlayer()) {
            const [advRow, advCol] = this.adversary.next(this.game)
            this.game = this.game.result(advRow, advCol);
            this.subject.next(this.game);
        }
    }

    public resetGame() {
        this.game = new GameRepr()
        this.subject.next(this.game)
    }
}


export const gameService = new GameService();
