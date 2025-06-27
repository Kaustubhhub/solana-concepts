use anchor_lang::prelude::*;

declare_id!("A7mp5doTvH4e3jZayao2XGrzeQmEmfVsqQ6XuaCeBQ14");

#[program]
pub mod first_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
