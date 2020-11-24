import * as _ from 'lodash';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from 'rxjs/operators'

export enum CellStatus {
    STATUS_PLAYER,
    STATUS_ADVERSARY,
    STATUS_NONE
}

class NotYetImplemented implements Error {
    message: string = "";
    name: string = "NotYetImplemented";
}


export class GameRepr {
    board: Array<Array<CellStatus>>;

    constructor(private n: number, private player = true, state: Array<Array<CellStatus>> | null = null) {
        if (!state) {
            this.board = Array(n);
            for (let row = 0; row < n; row++) {
                this.board[row] = Array(n)
                for (let col = 0; col < n; col++) {
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
        const newCells = _.cloneDeep(this.board);
        newCells[row][col] = (this.isPlayer() ? CellStatus.STATUS_PLAYER : CellStatus.STATUS_ADVERSARY);

        return new GameRepr(this.n, !this.player, newCells)
    }

    public getTile(row: number, col: number): CellStatus {
        return this.board[row][col];
    }

    public TerminalState(): boolean {
        throw new NotYetImplemented();
    }

    public Util(player: boolean){
        throw new NotYetImplemented();
    }
}

export class GameService {
    private game: GameRepr;
    private subject: BehaviorSubject<GameRepr>;
    private observable: Observable<GameRepr>


    constructor(n: number) {
        this.game = new GameRepr(n)
        this.subject = new BehaviorSubject(this.game)
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

    public next(row: number, col: number) {
        this.game = this.game.result(row, col);
        this.subject.next(this.game);
    }
}


export const gameService = new GameService(3);
