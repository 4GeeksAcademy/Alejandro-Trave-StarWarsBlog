"""empty message

Revision ID: eee024108fe5
Revises: 19a004f8f7e4
Create Date: 2024-05-31 18:52:01.934364

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eee024108fe5'
down_revision = '19a004f8f7e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('post_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'posts', ['post_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('post_id')

    # ### end Alembic commands ###
