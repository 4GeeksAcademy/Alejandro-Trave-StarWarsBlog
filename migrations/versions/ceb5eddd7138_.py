"""empty message

Revision ID: ceb5eddd7138
Revises: 337125b9cc86
Create Date: 2024-05-31 18:46:18.949967

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ceb5eddd7138'
down_revision = '337125b9cc86'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('date_publication', sa.Date(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('home_world', sa.String(), nullable=True))

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('body', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('date_publication', sa.Date(), nullable=False))
        batch_op.add_column(sa.Column('image_url', sa.String(), nullable=True))
        batch_op.drop_constraint('posts_user_id_fkey', type_='foreignkey')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('posts_user_id_fkey', 'users', ['user_id'], ['id'])
        batch_op.drop_column('image_url')
        batch_op.drop_column('date_publication')
        batch_op.drop_column('body')
        batch_op.drop_column('description')

    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.drop_column('home_world')

    op.drop_table('comments')
    # ### end Alembic commands ###
